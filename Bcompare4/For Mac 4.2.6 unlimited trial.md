for 4.2.4 or higher,4.2.5,4.2.6 ，it's works ， this is the way which makes Always in evaluation mode 。

1. go to the dir : `/Applications/Beyond Compare.app/Contents/MacOS`
2. change the name `BCompare` to `BCompare.bak`
3. touch a file name `BCompare` , and `chmod a+u BCompare`
4. insert BCompare the content :
```
#!/bin/bash
rm "/Users/$(whoami)/Library/Application Support/Beyond Compare/registry.dat"
"`dirname "$0"`"/BCompare.bak $@
```

5. restart bc .
