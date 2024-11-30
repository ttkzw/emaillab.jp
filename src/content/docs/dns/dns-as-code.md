---
title: DNS as Code
sidebar:
    order: 7
---

本記事ではDNS as Codeについて紹介します。

## クラウド時代におけるDNSゾーン運用の課題

クラウドサービスを利用する現在の時代では、DNSゾーン運用はマネージドDNSサービスを利用することが主流になっています。

APIを利用可能なサービスでは、サービスプロバイダーからSDK（ソフトウェア開発キット）やツールが提供されていれば、それを利用してゾーンを運用できます。しかし、SDKやツールはクラウドサービスを統合管理して利用するには便利ですが、DNSゾーンの運用に利用するには煩雑です。
そのため、結局、WebUI（コントロールパネル）を利用している人が多いでしょう。

### WebUI（コントロールパネル）起因の課題

WebUIでの運用には次のような課題があります。

- 変更管理ができない
- コメントを記述できない

特に変更管理については次のような課題があります。

- 変更履歴や変更理由を残せない（いつ誰が何をなぜ変更したのか）
- 変更内容（差分）を確認できない
- 問題発生時に切り戻しができない
- レビューや承認ができない

この課題に対する対策としては、WebUI（コントロールパネル）を使わず、ゾーンデータを手元でテキストファイルとして運用し、APIを利用してDNSサービスに反映させるということになります。
変更管理に起因する課題については、GitHubやGitLabのようなバージョン管理システムのプラットフォームを利用することで解決できます。
コメントの課題については、コメントを記述できるフォーマットを利用すれば解決できます。

### マネージドDNSサービスの大規模障害による課題

マネージドDNSサービスを利用していると、まれにそのサービスの大規模障害に巻き込まれることがあります。大規模障害が発生したときには、運用しているDNSゾーンに関する名前解決ができなくなり、運営しているサービスに影響がでます。
このとき、運営しているサービスを回復させるために、他のマネージドDNSサービスに移行しようとするとします。しかし、一次情報としてのゾーンデータは大規模障害発生中のマネージドDNSサービスにあり、手元にはありません。障害中であるため、ゾーンデータを取り出せるとは限りません。
この問題を回避する方法の1つとして（みんな大好き）スプレッドシートでゾーンデータを管理するという方法があります。いわゆる運用でカバーです。辛いです。

この対策として、あらかじめ他のマネージドDNSサービスに切り替えられる準備をしておくということがあげられます。
先ほど述べたように障害時にゾーンデータを取り出せるとは限りません。そのため、一次情報としてゾーンデータを手元に持ち、APIを利用して、手元のゾーンデータをマネージドDNSサービスに反映させます。大規模障害時にはゾーンデータの反映先のマネージドDNSサービスを切り替えます。

別の対策としては、あらかじめ複数のマネージドDNSサービスを利用するということがあげられます。
このとき、WebUI（コントロールパネル）による運用は無理があります。そのため、一次情報としてゾーンデータを手元に持ち、APIを利用して、手元のゾーンデータを複数のマネージドDNSサービスに反映させます。

### 課題の対策のまとめ

マネージドDNSサービスを利用する際の課題の対策をまとめると、次のようになります。

- 一次情報としてゾーンデータを手元に持つ
- APIを利用して、手元のゾーンデータをマネージドDNSサービスに反映させる

ここで、「APIを利用して、手元のゾーンデータをマネージドDNSサービスに反映させる」というのはどこかで見た光景です。「ITインフラの状態をコードで定義し、APIによりITインフラに反映させる」つまり“Infrastructure as Code”です。
これをDNSに特化して「インフラ」を「DNSゾーン」に置き換えると、「DNSゾーンの状態をコードで定義し、APIによりDNSゾーンに反映させる」つまり“DNS as Code”になります。

## “DNS as Code”とは

“DNS as Code”とは何でしょうか。“DNS as Code”を明確に定義した文章ありません。そこで、ここでは“DNS as Code”に言及している情報を見ていきます。

### DNSControl: A DSL for DNS as Code from StackOverflow.com

- [DNSControl: A DSL for DNS as Code from StackOverflow.com](https://www.usenix.org/conference/srecon17americas/program/presentation/peterson)

- 2017年3月14日、SREcon17 Americas
- Stack OverflowのSREチームのスタッフによるDNSControlの紹介
- 同日、DNSControlをオープンソースソフトウェアとして公開

### octoDNS - README.md(v0.8.0)

- [octoDNS - README.md(v0.8.0)](https://github.com/octodns/octodns/blob/7957a4c018f729e47ce976fa89f065284b959a52/README.md)
- 2017年3月16日、octoDNS公開
- 公開当初（v0.8.0）のREADME.mdの見出しに「DNS as code - Tools for managing DNS across multiple providers」という記述がある

### Introducing DnsControl – “DNS as Code” has Arrived

- [Introducing DnsControl – “DNS as Code” has Arrived](https://blog.serverfault.com/2017/04/11/introducing-dnscontrol-dns-as-code-has-arrived/)
- 2017年4月11日、Stack Exchange社のブログでDNSControlを紹介
- 記事のタイトルに“DNS as Code”が含まれている

### DevOps and DNS

- [DevOps and DNS](https://www.oreilly.com/library/view/devops-and-dns/9781492049241/)
- 2017年7月、Andy Still (Intechnica), Phil Stanhope (Oracle Dyn)によるO'Reilly Mediaのレポート
- “Chapter 4. Managing DNS in a DevOps Culture”に“DNS as Code”についての言及がある

該当箇所を要約すると「（DevOpsの文脈で）すべてのDNSの変更を動的にAPIで管理できるようになれば、すべてのDNSレコードを含めるようにInfrastructure as Codeを拡張し、コードの変更管理をし始めることが次の段階だ」

注意）この文書を読むにはO’Reilly learning platformのサブスクリプションが必要です。

### DNS as Code

- [DNS as Code](https://www.akamai.com/blog/security/dns-as-code-)
- 2020年6月、Akamai社のブログ
- Edge DNSのDNSゾーンの管理にTerraformを利用する例を紹介している

## “DNS as Code”とは結局は何なのか

“DNS as Code”は2017年から登場した言葉のようです。“Infrastructure as Code”をDNSに特化したものです。「DNSゾーンの状態をコードで定義し、APIによりDNSゾーンに反映させる」ということになります。

なぜ2017年から登場したのかというと、2016年10月のマネージドDNSサービスプロバイダーのDynへの大規模DDoSがきっかけです。

その後、2017年1月にStack Exchange社のブログに次の記事が公開されました。

- [How Stack Overflow plans to survive the next DNS attack](https://blog.serverfault.com/2017/01/09/surviving-the-next-dns-attack/)

これは、2016年10月のDynへの大規模DDoS攻撃を背景として、次に同様な攻撃が発生したときにどのようなアプローチをとれるかを検討した記事です。

2017年3月に“DNS as Code”としてDNSControlとoctoDNSが公開されました。

- 2017年3月14日：DNSControl v0.1.0公開
- 2017年3月16日：octoDNS v0.8.0公開

DNSControlとoctoDNSの主な特徴は次のとおりです。

- ゾーンをコードとして記述するテキストファイル
- 複数のDNSプロバイダーに対応
- 既存のDNSプロバイダーからのインポートに対応
- プレビュー/dry-run機能により実際に登録されているゾーンデータからの更新内容の確認

コード（テキストファイル）であることの利点は次のとおりです。

- コメントを記述できる
- Gitのようなバージョン管理システムを利用できる
- GitHubやGitLabのようなバージョン管理システムのプラットフォームを利用できる

「Gitのようなバージョン管理システムを利用できる」ことにより次のことができます。

- 変更履歴や変更理由を残せる
- 変更内容（差分）を確認できる
- 問題発生時に切り戻しができる

「GitHubやGitLabのようなバージョン管理システムのプラットフォームを利用できる」ことにより次のことができます。

- プルリクエストやマージリクエストによりレビューや承認ができる
- CI（継続的インテグレーション）として、構文チェックや更新内容の確認（プレビュー/dry-run機能の利用）ができる
- CD（継続的デリバリー）として、DNSプロバイダーへのゾーンの反映ができる

## まとめ

“DNS as Code”の実装であるDNSControlやoctoDNSを利用することにより、変更管理やコメントを利用できます。
さらに、GitHubやGitLabのようなバージョン管理システムのプラットフォームを利用することでレビュー・承認やCI/CDが利用できます。
