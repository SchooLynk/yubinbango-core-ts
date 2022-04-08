# これは何か

[SchooLynk/yubinbango-core](https://github.com/SchooLynk/yubinbango-core) の typescript compileが通らないため、作成されたものです。

# どうやって使うの？

github の packageとして公開してます。
こちらからお使いください。

https://github.com/SchooLynk/yubinbango-core-ts/packages/

yarn で仕様する際にには .yarnrc に以下を記載してください。

```
"@schoolynk:registry" "https://npm.pkg.github.com"
```

参考
https://stackoverflow.com/questions/58316109/yarn-cant-find-private-github-npm-registry

# 開発方法

ファイルの追加、修正をおえたら package.json の version を編集して commitしてください。
PR をマージ後、リリースされます。

# TODO

- [] test を記載する。
- [] browser 依存ではなくする。
- [] any 型を使っているところを修正する。
