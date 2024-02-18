---
title: SpamAssassin日本語対応パッチ
---
最新版はSpamAssassin 3.4.1に対するパッチです。

## 概要

オリジナルのSpamAssassinではnormalize_charsetオプションを有効にすることにより、日本語等のマルチバイトの文字をUTF-8に正規化してから、ルールの評価を行うことができることが意図されています。
しかし、SpamAssassin 3.4.0以前では、実はこの設定オプションは十分には機能していませんでした。
そのため、日本語等のマルチバイト文字の言語を正しく扱うために、この日本語対応パッチが開発されてきました。
SpamAssassin 3.4.1からは概ねうまく動作するようになりましたが、ベイジアンフィルタが分かち書きされていない日本語をそのままではうまく扱えないので、この日本語対応パッチではその対応を行っています。

## パッチの配布元

次のサイトから日本語対応パッチをダウンロードできます。

- [SpamAssassin 3.4系列の日本語対応パッチ](http://spamassassin.emaillab.jp/pub/ja-patch/sa3.4/)
- [SpamAssassin 3.3系列の日本語対応パッチ](http://spamassassin.emaillab.jp/pub/ja-patch/sa3.3/)
- [SpamAssassin 3.2系列の日本語対応パッチ](http://spamassassin.emaillab.jp/pub/ja-patch/sa3.2/)

以下のパッチ等をダウンロードできます。

- 説明ファイル: spamassassin-3.4.1-ja-1.txt
- 日本語対応パッチ（総合パッチ）: spamassassin-3.4.1-ja-1.patch
- 分かち書きプラグインの設定ファイル: tokenizer.pre

※バージョンにより、ファイル名は少し異なります。

## パッチの内容

このパッチは以下のことを行っています。

- normalize_charsetオプションの改良：Ideographic Spaceのtrimの実施。文字エンコーディングの判定処理の改善や言語の判定機能の追加
- 文字エンコーディングや言語の判定に関するユーティリティモジュールの追加
- report_charsetオプションの改良
- ベイジアンフィルタのUTF-8対応：UTF-8の文字が文字落ちするバグの修正
- ベイジアンフィルタの日本語対応：日本語のトークナイザーの追加

このパッチが提供する機能は次のものです。

- ベイズフィルタの日本語対応：ベイズフィルタで日本語の文書を正しく学習・判定できるようになる。

ルールの記述例

```
header   SUBJ_MISHODAKU  Subject =~ /(未|末)承諾/
body     DEAI            /出(会|逢)/
```

このパッチの制限事項は次の通りです。

- sa-compileはUTF-8の文字が含まれているとコンパイルの対象外になります。これはSpamAssassinの仕様です。
- パターンにおいてUTF-8の文字のブラケット表現（文字クラス）を使用できません。つまり"`/[あーお]+/`"のようなパターンを使うことができません。


## インストール

### 事前準備

次のソフトウェアを事前にインストールしてください。
なお、2,3,4に関してはTokenizer::MeCabプラグインを使う場合に必要です。
5,6は必須ではないですが、それぞれ日本語と中国語の判定制度が向上します。

1. 文字エンコーディング検出器Encode::Detect
    - 配布元: http://search.cpan.org/~jgmyers/Encode-Detect/
2. 形態素解析エンジンMeCab
    - 必要とするバージョン: 0.98以降
    - 配布元: http://mecab.sourceforge.jp/
    - インストール時の注意事項:
        - ./configureのオプションで"--with-charset=utf8"を付ける必要がある。
3. MeCabの辞書mecab-ipadic
    - 必要とするバージョン: 2.7.0-20070801以降
    - 配布元: http://mecab.sourceforge.jp/
    - インストール時の注意事項:
        - ./configureのオプションで"--with-charset=utf8"を付ける必要がある。
4. MeCabのPerlバインディングmecab-perl
    - 必要とするバージョン: 0.98以降
    - 配布元: http://mecab.sourceforge.jp/
5. Microsoft Windows互換日本語エンコーディングモジュールEncode::EUCJPMS
    - 配布元: http://search.cpan.org/~naruse/Encode-EUCJPMS/
6. 中国語拡張エンコーディングモジュールEncode::HanExtra
    - 配布元: http://search.cpan.org/~audreyt/Encode-HanExtra/

### SpamAssassin

SpamAssassinのtar ballを展開後、このパッチを当ててください。

```sh
$ cd Mail-SpamAssassin-3.4.x
$ patch -p1 < spamassassin-3.4.x-ja-y.patch
```

後は、通常のSpamAssassinのインストールと同じです。

## 使い方

1. 設定ファイルlcoal.cfに次の行を記述します。

    ```
    normalize_charset 1
    ```

2. tokenizer.pre(別配布)をlocal.cfと同じディレクトリにコピーして次の行のコメントを解除してSimpleJAプラグインを有効にします。

    ```
    loadplugin Mail::SpamAssassin::Plugin::Tokenizer::SimpleJA
    ```

    SimpleJAは文字種（漢字、ひらがな、カタカナ、英数字）により分かち書きを行うプラグインです。

    精度の高い分かち書きを行う場合にはMeCabプラグインを使ってください。MeCabプラグインを使う場合はSimpleJAプラグインをコメントアウトにより無効にして、MeCabプラグインの行のコメントを解除して有効にします。

    ```
    # loadplugin Mail::SpamAssassin::Plugin::Tokenizer::SimpleJA
    loadplugin Mail::SpamAssassin::Plugin::Tokenizer::MeCab
    ```

3. UTF-8対応のエディタで設定ファイルlocal.cf,user_prefs等を編集して、headerテストと"body"ルールにおいて日本語でパターンを記述します。記述したら、このファイルを文字エンコーディングをUTF-8に指定して保存してください。

    ルールの記述例:

    ```
    header   SUBJ_MISHODAKU  Subject =~ /(未|末)承諾/
    describe SUBJ_MISHODAKU  Subject: mishodaku
    score    SUBJ_MISHODAKU  2.5

    body     DEAI            /出(会|逢)/
    describe DEAI            'deai'
    score    DEAI            0.5
    ```

4. `spamassassin --lint`を実行して、ワーニングが出ていないかを確認します。
5. 以上で準備が整いましたのでspamd等のデーモンを利用している人はデーモンを再起動してください。
