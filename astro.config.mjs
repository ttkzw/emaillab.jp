import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "ttkzw's site",
			social: {
				github: "https://github.com/withastro/starlight",
			},
			sidebar: [
				{
					label: "文字コード",
					autogenerate: { directory: "charcode" },
				},
				{
					label: "Linux/FLOSS",
					autogenerate: { directory: "floss" },
				},
				{
					label: "DNS",
					autogenerate: { directory: "dns" },
				},
				{
					label: "MAIL",
					autogenerate: { directory: "mail" },
				},
				{
					label: "Mutt",
					autogenerate: { directory: "mutt" },
				},
				{
					label: "SpamAssassin",
					items: [
						{
							label: "SpamAssassin",
							link: "/spamassassin/",
						},
						{
							label: "SpamAssassinの紹介",
							link: "/spamassassin/introduction/",
						},
						{
							label: "SpamAssassinの概要",
							link: "/spamassassin/outline/",
						},
						{
							label: "SpamAssassinのインストール",
							link: "/spamassassin/install/",
						},
						{
							label: "SpamAssassinの基本設定",
							link: "/spamassassin/basic_configuration/",
						},
						{
							label: "SpamAssassinのスコア調整",
							link: "/spamassassin/required_score/",
						},
						{
							label: "SpamAssassin付属ツールの紹介",
							link: "/spamassassin/tool/",
						},
						{
							label: "SpamAssassinのルールの書き方",
							link: "/spamassassin/rule/",
						},
						{
							label: "SpamAssassin日本語対応パッチ",
							link: "/spamassassin/ja-patch/",
						},
						{
							label: "SpamAssassinルールファイル自動更新(sa-update)",
							link: "/spamassassin/sa-update/",
						},
						{
							label: "SpamAssassinの資料",
							link: "/spamassassin/presentation/",
						},
					],
				},
				{
					label: "About",
					link: "about",
				},
			],
		}),
	],
});
