# async_methods_benchmark

## Waterfall(ish)

### Problem.
    1. Read the contents of an image (1.6mb).
    2. Write to a temporal image.
    3. Delete temporal image after done writing.

### Performance after 1000 runs.

|Library name|Average time (ms)|Total time (ms)|
|:-----------|---------------:|--------------:|
|Callbacks (plain js)|4.5|4517|
|[Bluebird](https://github.com/petkaantonov/bluebird)|5.2|5172|
|[async](https://github.com/caolan/async)|6|6002|
|[fluorine](https://github.com/freshout-dev/fluorine)|8.5|8455|