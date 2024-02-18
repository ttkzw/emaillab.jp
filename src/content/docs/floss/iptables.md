---
title: iptables
---
Netfilter/iptablesのフロー図を作ってみましたので公開します。

この図のテーマはrawテーブル、mangleテーブル、natテーブルのPREROUTINGチェインとOUTPUTチェインを並列に並べて表示させることです。利用できるターゲットがほぼ同じであることがわかるでしょう。

iptablesについて学習する人は[iptables-tutorial](https://straypenguin.winfield-net.com/ipttut/)を読むとよいです。

![iptables](/docs/floss/iptables-traversing.png)
