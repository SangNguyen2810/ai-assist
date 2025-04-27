export interface BatchProcessorOptions {
  /**
   * Number of items to collect before processing the batch
   * @default 10
   */
  batchSize?: number;
  
  /**
   * Time in milliseconds to wait before automatically processing a batch
   * @default 30000 (30 seconds)
   */
  flushInterval?: number;
  
  /**
   * Maximum number of retry attempts for failed batches
   * @default 3
   */
  maxRetries?: number;
  
  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean;
} 