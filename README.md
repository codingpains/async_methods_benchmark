# async_methods_benchmark

## Waterfall(ish)

### Problem.
    1. Read the contents of an image (1.6mb).
    2. Write to a temporal image.
    3. Delete temporal image after done writing.

### Performance after 1000 runs.

|Library name|Average time (ms)|Total time (ms)|
|:-----------|---------------:|--------------:|
|Bluebird|5.2|5172|
|Callbacks (plain js)|5.6|5608|
|async|6|6002|
|fluorine|8.5|8455|