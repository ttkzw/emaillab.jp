---
title: Linux-PAM
---
[日経Linux 2010年3月号](http://itpro.nikkeibp.co.jp/article/MAG/20100204/344212/?ST=oss)の記事「即実践！ セキュリティ対策（第6回）　PAMによる認証を知る」用に作った制御フラグについての説明を元にして修正を加えたものを公開します。（興味があったら雑誌を読んでね）

PAMを理解するときに、一番わかりにくいのは制御（コントロール）フラグですので、その理解するのに参考なればと。

## 制御フラグ

制御フラグはモジュールの実行結果に対してどのように制御するかを指示します。

複数のモジュールがスタックされているときには、モジュール毎に付いた制御フラグの指示に従って、モジュールの実行結果により処理を中止したり、終了したり、結果を無視したりできます。

この制御フラグの簡易記述方法には次の表のものがあります。

|制御フラグ|説明|
|---|---|
|required|失敗したときには、スタックしている残りのモジュールを実行した後に、最初に失敗したrequiredのモジュールのエラーを報告する。|
|requisite|失敗したときには、スタックされた残りのモジュールの実行を中止し、最初に失敗したrequiredあるいはrequisiteのエラーを報告する。|
|sufficient|成功したときには、これより前に実行したrequiredの結果に失敗がなければ（残りにrequiredのモジュールがあっても）直ちに処理を終了し、成功を報告する。失敗したときには、この結果は無視される。|
|optional|成功したときには、他のモジュールが成功していないときのみ意味を持つ。失敗したときには、この結果は無視される。|
|include|指定した設定ファイルを読み込む。|

この文章を読んだだけでは理解できませんね。書いている本人も理解できません。
では、次のように制御の流れを図にまとめてみたので、上述した説明を追いかけてみてください。

![PAM制御](/docs/floss/pam-control.png)

図で制御の流れを追いかけてみると、上述した説明通りにしか説明できないのが理解できます。

成功を報告するための条件は次の通りです。


- "required"あるいは"requisite"の制御フラグが付いたモジュールがあるときには、一つも失敗をせずにどれかが成功している。
- "sufficient"の制御フラグが付いたモジュールがあるときには、このモジュールより前に実行した"required"あるいは"requisite"のモジュールが失敗していなくて、"sufficient"のモジュールのうちどれかが成功している。
- "required"あるいは"requisite"の制御フラグが付いたモジュールがないときに、"sufficient"あるいは"optional"のモジュールのどれかが成功している。

このどの条件も満たさないときにはエラーが報告されます。

## 参考文献

- [The Linux-PAM System Administrators' Guide](http://debian.securedservers.com/kernel/pub/linux/libs/pam/Linux-PAM-html/Linux-PAM_SAG.html)
- [Solaris のシステム管理 (セキュリティサービス) - 第 17 章 PAM の使用](http://download.oracle.com/docs/cd/E19253-01/819-0383/pam-1/index.html)