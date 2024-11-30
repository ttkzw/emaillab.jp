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

変更管理ができない課題の詳細については次のようなものがあります。

- 変更履歴や変更理由を残せない（いつ誰が何をなぜ変更したのか）
- 変更内容（差分）を確認できない
- 問題発生時に切り戻しができない
- レビューや承認ができない

これらの課題に対する対策としては、WebUI（コントロールパネル）を使わず、ゾーンデータを手元でテキストファイルとして運用し、APIを利用してDNSサービスに反映させるということになります。

変更管理に起因する課題については、GitHubやGitLabのようなバージョン管理システムのプラットフォームを利用することで解決できます。

コメントの課題については、コメントを記述できるフォーマットを利用すれば解決できます。

### マネージドDNSサービスの大規模障害による課題

マネージドDNSサービスを利用していると、まれにそのサービスの大規模障害に巻き込まれることがあります。大規模障害が発生したときには、運用しているDNSゾーンに関する名前解決ができなくなり、運営しているサービスに影響がでます。

このとき、運営しているサービスを回復させるために、他のマネージドDNSサービスに移行しようと考えてみます。しかし、一次情報としてのゾーンデータは大規模障害発生中のマネージドDNSサービスにあり、手元にはありません。障害中であるため、ゾーンデータを取り出せるとは限りません。

この問題を回避する方法の1つとして（みんな大好き）スプレッドシートでゾーンデータを管理するという方法があります。いわゆる運用でカバーです。辛いです。

この対策として、あらかじめ他のマネージドDNSサービスに切り替えられる準備をしておくということがあげられます。先ほど述べたように障害時にゾーンデータを取り出せるとは限りません。そのため、一次情報としてゾーンデータを手元に持ち、APIを利用して、手元のゾーンデータをマネージドDNSサービスに反映させます。大規模障害時にはゾーンデータの反映先のマネージドDNSサービスを切り替えます。

別の対策としては、あらかじめ複数のマネージドDNSサービスを利用するということがあげられます。このとき、WebUI（コントロールパネル）による運用は無理があります。そのため、一次情報としてゾーンデータを手元に持ち、APIを利用して、手元のゾーンデータを複数のマネージドDNSサービスに反映させます。

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

![Dyn DDoS Attach](/dns/dns-as-code/images/dyn-ddos.png)

その後、2017年1月にStack Exchange社のブログに次の記事が公開されました。

- [How Stack Overflow plans to survive the next DNS attack](https://blog.serverfault.com/2017/01/09/surviving-the-next-dns-attack/)

これは、2016年10月のDynへの大規模DDoS攻撃を背景として、次に同様な攻撃が発生したときにどのようなアプローチをとれるかを検討した記事です。

2017年3月に“DNS as Code”の実装としてDNSControlとoctoDNSが公開されました。

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


## DNS as Codeの実装

DNS as Codeを実装したものには以下のものがあります。

- クラウドサービスプロバイダー提供プロビジョニングツール
- [Terraform](https://www.terraform.io/)/[OpenTofu](https://opentofu.org/)
- [DNSControl](https://github.com/StackExchange/dnscontrol)
- [octoDNS](https://github.com/octodns/octodns)

### リソースレコードの記述のしやすさ

リソースレコードの記述しやすさについて考えてみます。リソースレコードの数が少なけば、それほど問題にはなりません。リソースレコードの数が多いと、記述しやすさは重要です。

リソースレコードの記述例をそれぞれの公式ドキュメントから見てみます。

#### AWS CloudFormation (Amazon Route 53)

```json
"myDNSRecord" : {
  "Type" : "AWS::Route53::RecordSet",
  "Properties" : 
  {
    "HostedZoneId" : "Z3DG6IL3SJCGPX",
    "Name" : "mysite.example.com.",
    "Type" : "SPF",
    "TTL" : "900",
    "ResourceRecords" : [ "\"v=spf1 ip4:192.168.0.1/16 -all\"" ]
  }
}
```

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-route53.html

#### Azure Resource Manager template (Azure DNS)

```json
    {
      "type": "Microsoft.Network/dnsZones/A",
      "apiVersion": "2018-05-01",
      "name": "[format('{0}/{1}', parameters('zoneName'), parameters('recordName'))]",
      "properties": {
        "TTL": 3600,
        "ARecords": [
          {
            "ipv4Address": "1.2.3.4"
          },
          {
            "ipv4Address": "1.2.3.5"
          }
        ]
      },
略
    }
```

https://learn.microsoft.com/en-us/azure/dns/dns-get-started-template

#### Google Cloud Deployment Manager (Google Cloud DNS)

```yaml
- name: {{ properties["rrsetName"] }}
  type: gcp-types/dns-v1:resourceRecordSets
  properties:
    name: {{ properties["rrsetDomain"] }}
    managedZone: $(ref.{{ properties["zoneName"] }}.name)
    records:
    - type: A
      ttl: 50
      rrdatas:
      - 10.40.10.0
```

https://github.com/GoogleCloudPlatform/deploymentmanager-samples/blob/master/google/resource-snippets/dns-v1/one_a_record.jinja

#### Terraform/OpenTofu (Amazon Route 53)

```
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www.example.com"
  type    = "A"
  ttl     = 300
  records = [aws_eip.lb.public_ip]
}
```

https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record


#### Terraform/OpenTofu (Azure DNS)

```
resource "azurerm_dns_a_record" "example" {
  name                = "test"
  zone_name           = azurerm_dns_zone.example.name
  resource_group_name = azurerm_resource_group.example.name
  ttl                 = 300
  records             = ["10.0.180.17"]
}
```

https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dns_a_record

#### Terraform/OpenTofu (Google Cloud DNS)

```
resource "google_dns_record_set" "a" {
  name         = "backend.${google_dns_managed_zone.prod.dns_name}"
  managed_zone = google_dns_managed_zone.prod.name
  type         = "A"
  ttl          = 300

  rrdatas = ["8.8.8.8"]
}
```

https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/dns_record_set

#### DNSControl

```javascript
  A("test", "5.6.7.8")
```

https://github.com/StackExchange/dnscontrol

JavaScriptベースのDSLです。

#### octoDNS

```yaml
---
'':
  ttl: 60
  type: A
  values:
    - 1.2.3.4
    - 1.2.3.5
```

https://github.com/octodns/octodns

YAMLです。マスターファイル形式も扱えます。

#### 【参考】マスターファイル（ゾーンファイル）

```
test 300 IN A 192.0.2.1
```

### リソースレコードの記述のしやすさのまとめ

クラウドサービスプロバイダー提供プロビジョニングツールとTerraform/OpenTofuについては、プロバイダーにより記述方法が異なります。リソースレコードセットごとにリソースを定義するため、記述が冗長です。数個だけであれば大変ではないですが、100個あるときはどうでしょうか。

DNSControlとoctoDNSとマスターファイルについては、DNSに特化しているため、記述が簡潔です。


## DNS as CodeとCI/CDを利用したゾーン運用

DNS as CodeとCI/CDを利用したゾーン運用を紹介します。

GitHubやGitLabのようなバージョン管理システムのプラットフォームを利用すると、次のようなワークフローによりゾーンの更新作業が行えます。

1. リポジトリのフォーク
2. git pull
3. ブランチ作成
4. ゾーンファイルの編集
5. git commit、git push
6. プルリクエストやマージリクエストの作成
7. CI（継続的インテグレーション）
    - 構文チェック
    - 更新内容の出力（プレビュー/dry-run機能の利用）
8. レビュー、承認
9. マージ
10. CD（継続的デリバリー）
    - DNSプロバイダーへのゾーンの反映

ここでは、GitHub Actionsを利用してDNSControlによるゾーン運用を行う例を紹介します。

DNSControlについては「[DNSControl](/dns/dnscontrol/)」をご覧ください。

### GitHubのリポジトリに対して事前に行うこと

GitHubのリポジトリに対して事前に以下のことを行います。

デフォルトブランチ（main）に対してルールを設定します。

- Settings → Rules → Ruleset
    - ☑Require a pull request before merging
        - Required approvals: 1 ←承認が必要な場合
    - ☑Require status checks to pass
        - Status checks that are required
            - PR時に実行するGitHub Actionsを指定

DNSプロバイダーで利用する認証情報をシークレットとして登録します。

- Settings → Secrets and variables → Actions
    - Repository secrets

### リポジトリのファイル構成

リポジトリのファイル構成は次のようになります。

- creds.json - DNSプロバイダー設定（認証情報含む）
- dnsconfig.js - ゾーンファイル
- .github/
    - workflows/
        - preview.yml - Pull Request作成・更新時に実行する
        - push.yml - マージしたときに実行する

#### creds.json

creds.jsonファイルには認証情報を環境変数から取得するように設定します。

```json
{
  "sakuracloud": {
    "TYPE": "SAKURACLOUD",
    "access_token": "$SAKURACLOUD_ACCESS_TOKEN",
    "access_token_secret": "$SAKURACLOUD_ACCESS_TOKEN_SECRET"
  }
}
```

#### preview.yml

ファイルpreview.ymlにはプレビューを実行するワークフローを定義します。

次の例ではPull Request作成時・更新時にワークフローを実行し、プレビューを行います。

```yaml
name: preview
on:
  pull_request:
    branches: [ 'main' ]
    paths: [ 'creds.json', 'dnsconfig.js' ]
jobs:
  preview:
    runs-on: ubuntu-latest
    container:
      image: stackexchange/dnscontrol
    steps:
      - uses: actions/checkout@v4
      - name: dnscontrol preview
        run: dnscontrol preview
        env:
          SAKURACLOUD_ACCESS_TOKEN: ${{ secrets.SAKURACLOUD_ACCESS_TOKEN }}
          SAKURACLOUD_ACCESS_TOKEN_SECRET: ${{ secrets.SAKURACLOUD_ACCESS_TOKEN_SECRET }}
```

#### push.yml

ファイルpush.ymlにはDNSプロバイダーにゾーンデータを反映するワークフローを定義します。

次の例ではmainブランチにマージするときにワークフローを実行し、ゾーンデータをDNSプロバイダーに反映します。

```yaml
name: push
on:
  push:
    branches: [ 'main' ]
    paths: [ 'creds.json', 'dnsconfig.js' ]
jobs:
  push:
    runs-on: ubuntu-latest
    container:
      image: stackexchange/dnscontrol
    steps:
      - uses: actions/checkout@v4
      - name: dnscontrol push
        run: dnscontrol push
        env:
          SAKURACLOUD_ACCESS_TOKEN: ${{ secrets.SAKURACLOUD_ACCESS_TOKEN }}
          SAKURACLOUD_ACCESS_TOKEN_SECRET: ${{ secrets.SAKURACLOUD_ACCESS_TOKEN_SECRET }}
```

### 実行例

実行例を示します。

変更前のdnsconfig.jsファイルには以下の内容が記述されていたとします。

```javascript
var REG_NONE = NewRegistrar("none");
var DSP_SAKURACLOUD = NewDnsProvider("sakuracloud");

D("dnsbeer.com", REG_NONE, DnsProvider(DSP_SAKURACLOUD),
  DefaultTTL(3600),
  A("pale-ale", "192.0.2.1", TTL(1800)),
  A("pilsner", "192.0.2.2"),
END);
```

これを以下の内容に変更します。

```javascript
var REG_NONE = NewRegistrar("none");
var DSP_SAKURACLOUD = NewDnsProvider("sakuracloud");

D("dnsbeer.com", REG_NONE, DnsProvider(DSP_SAKURACLOUD),
  DefaultTTL(3600),
  HTTPS("@", 1, "pale-ale.dnsbeer.com.", ""),
  A("pale-ale", "192.0.2.1"),
END);
```

次のように差分を確認します。

```diff
$ git diff
diff --git a/dnsconfig.js b/dnsconfig.js
index 5d7717b..151134f 100644
--- a/dnsconfig.js
+++ b/dnsconfig.js
@@ -3,6 +3,6 @@ var DSP_SAKURACLOUD = NewDnsProvider("sakuracloud");
 
 D("dnsbeer.com", REG_NONE, DnsProvider(DSP_SAKURACLOUD),
   DefaultTTL(3600),
-  A("pale-ale", "192.0.2.1", TTL(1800)),
-  A("pilsner", "192.0.2.2"),
+  HTTPS("@", 1, "pale-ale.dnsbeer.com.", ""),
+  A("pale-ale", "192.0.2.1"),
 END);
```

次のようにコミットしてプッシュします。

```sh
$ git commit -a -m "pilsnerの削除"
[test 3e06266] pilsnerの削除
 1 file changed, 2 insertions(+), 2 deletions(-)

$ git push origin HEAD
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 370 bytes | 370.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To github.com:ttkzw/dns-as-code-example.git
   bfe0ed3..3e06266  HEAD -> test
```

次のようにPull Requestを作成します。

![Pull Request作成](/dns/dns-as-code/images/github-pr1.png)

![Pull Request作成](/dns/dns-as-code/images/github-pr2.png)

Pull Requestの作成が完了すると、次のようにワークフローpreviewが実行されます。

![ワークフローpreviewの実行](/dns/dns-as-code/images/github-pr3.png)

Pull Request時のGitHub Actionsの実行結果は次のようになります。

![Pull Request時のGitHub Actionsの実行結果](/dns/dns-as-code/images/github-actions1.png)

内容を確認して問題なければマージします。このとき、次のようにワークフローpushが実行されます。

![ワークフローpushの実行](/dns/dns-as-code/images/github-pr4.png)

マージ時のGitHub Actionsの実行結果は次のようになります。

![マージ時のGitHub Actionsの実行結果](/dns/dns-as-code/images/github-actions2.png)

ちなみに、ワークフローの失敗時のPull Request画面は次のようになります。

![ワークフローの失敗時](/dns/dns-as-code/images/github-failed1.png)

このときのGitHub Actionsの実行結果は次のようになります。

![ワークフローの失敗時のGitHub Actionsの実行結果](/dns/dns-as-code/images/github-failed2.png)

承認を必要とする設定をしたときにReviewersを指定しないと、次のように「Review required」が表示され、「Merging is blocked」が表示されマージできません。

![認証を必要としたとき](/dns/dns-as-code/images/github-approve1.png)


## 複数のマネージドDNSサービスの利用上の注意点

複数のマネージドDNSサービスを利用する際の注意点は以下のものがあります。

ゾーン頂点のNSレコードを追加できる必要があります。ゾーン頂点のNSレコードを追加・変更できないマネージドDNSサービスは多いです。

レジストラーに登録できるNSレコードの数に制限があることがあります。このときにはどのNSレコードを登録するか検討します。

マネージドDNSサービスによってリソースレコードの制限が異なります。


## まとめ

“DNS as Code”の実装であるDNSControlやoctoDNSを利用することにより、変更管理やコメントを利用できます。
さらに、GitHubやGitLabのようなバージョン管理システムのプラットフォームを利用することでレビュー・承認やCI/CDが利用できます。

