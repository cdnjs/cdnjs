/** 
 * Run mobilize.js auto-loader.
 * 
 * Leave this file as the last of every bundle, so
 * loader is not executed until all Javascript is loaded.
 */

// Execute mobilization automatically.
// To prevent autoloading, set window.mobilizeAutoload = false;
mobilize.autoload();
