---
title: SpamAssassinのインストール
sidebar:
    order: 3
---
ここでは、SpamAssassin 3.4系列のインストールについて説明します。特に日本語パッチについて説明します。

## 事前準備

次のソフトウェアを事前にインストールしてください。
なお、2,3,4に関してはTokenizer::MeCabプラグインを使う場合に必要です。

1. 文字エンコーディング検出器Encode::Detect
    - 配布元：http://search.cpan.org/~jgmyers/Encode-Detect/
2. 形態素解析エンジンMeCab
    - 必要とするバージョン：0.98以降
    - 配布元：http://mecab.sourceforge.jp/
    - インストール時の注意事項：./configureのオプションで"--with-charset=utf8"を付ける必要がある
3. MeCabの辞書mecab-ipadic
    - 必要とするバージョン：2.7.0-20070801以降
    - 配布元：http://mecab.sourceforge.jp/
    - インストール時の注意事項：./configureのオプションで"--with-charset=utf8"を付ける必要がある
4. MeCabのPerlバインディングmecab-perl
    - 必要とするバージョン：0.98以降
    - 配布元：http://mecab.sourceforge.jp/

## インストール

### SpamAssassinのtarボール

SpamAssassinの公式サイトからSpamAssassinのtarボールをダウンロードします。

- http://spamassassin.apache.org/

### 日本語パッチ

日本語パッチを次の場所からダウンロードします。

- http://spamassassin.emaillab.jp/pub/ja-patch/sa3.4/

SpamAssassinのtar ballを展開後、日本語パッチを当ててください。

```sh
$ cd Mail-SpamAssassin-3.4.x
$ patch -p1 &lt; spamassassin-3.4.x-ja-y.patch
```

後は、通常のSpamAssassinのインストールと同じです。

### インストール後

SpamAssassin 3.3以降ではルールファイルは同梱されなくなりました。
sa-updateコマンドを実行することにより、ルールファイルをダウンロードできます。
そのため、インストール後にはすぐにsa-updateコマンドを実行してください。

```
# sa-update
```

また、定期的（週に1度、短くても1日に1度）にルールファイルを更新するようにcrontabに登録してください。
