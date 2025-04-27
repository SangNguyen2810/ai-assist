import { BatchProcessorOptions } from '@/types/batch';
import {
  DEFAULT_BATCH_SIZE,
  DEFAULT_FLUSH_INTERVAL,
  DEFAULT_MAX_RETRIES,
  DEFAULT_DEBUG_MODE
} from '@/constants/supabase-constants';

export class BatchProcessor<T> {
  private queue: T[] = [];
  private flushTimeoutId: NodeJS.Timeout | null = null;
  private options: Required<BatchProcessorOptions>;
  private processingCallback: (items: T[]) => Promise<{ success: boolean }>;

  constructor(
    processingCallback: (items: T[]) => Promise<{ success: boolean }>,
    options: BatchProcessorOptions = {}
  ) {
    this.processingCallback = processingCallback;
    this.options = {
      batchSize: options.batchSize || DEFAULT_BATCH_SIZE,
      flushInterval: options.flushInterval || DEFAULT_FLUSH_INTERVAL,
      maxRetries: options.maxRetries || DEFAULT_MAX_RETRIES,
      debug: options.debug ?? DEFAULT_DEBUG_MODE
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        if (this.queue.length > 0) {
          this.flush();
        }
      });
    }
  }

  /**
   * Add an item to the batch queue
   */
  public add(item: T): void {
    this.queue.push(item);
    
    if (this.options.debug) {
      console.log(`[BatchProcessor] Added item. Queue size: ${this.queue.length}`);
    }

    // Start flush timer if not already running
    if (!this.flushTimeoutId) {
      this.flushTimeoutId = setTimeout(() => this.flush(), this.options.flushInterval);
      
      if (this.options.debug) {
        console.log(`[BatchProcessor] Started flush timer: ${this.options.flushInterval}ms`);
      }
    }

    // Flush immediately if we've reached batch size
    if (this.queue.length >= this.options.batchSize) {
      this.flush();
    }
  }

  /**
   * Manually trigger a flush of the queue
   */
  public async flush(): Promise<void> {
    if (this.flushTimeoutId) {
      clearTimeout(this.flushTimeoutId);
      this.flushTimeoutId = null;
    }

    if (this.queue.length === 0) return;

    const itemsToProcess = [...this.queue];
    this.queue.length = 0;

    if (this.options.debug) {
      console.log(`[BatchProcessor] Flushing ${itemsToProcess.length} items`);
    }

    try {
      const { success } = await this.processingCallback(itemsToProcess);
      
      if (!success) {
        if (this.options.debug) {
          console.error('[BatchProcessor] Processing failed, returning items to queue');
        }
        this.queue.unshift(...itemsToProcess);
      }
    } catch (err) {
      if (this.options.debug) {
        console.error('[BatchProcessor] Error processing batch:', err);
      }
      this.queue.unshift(...itemsToProcess);
    }
  }

  /**
   * Get the current queue size
   */
  public getQueueSize(): number {
    return this.queue.length;
  }

  /**
   * Clear the entire queue
   */
  public clear(): void {
    this.queue.length = 0;
    
    if (this.flushTimeoutId) {
      clearTimeout(this.flushTimeoutId);
      this.flushTimeoutId = null;
    }
    
    if (this.options.debug) {
      console.log('[BatchProcessor] Queue cleared');
    }
  }
} 