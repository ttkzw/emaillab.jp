import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "ttkzw's site",
			sidebar: [
				{
					label: "文字コード",
					collapsed: true,
					autogenerate: { directory: "charcode" },
				},
				{
					label: "Linux/FLOSS",
					collapsed: true,
					autogenerate: { directory: "floss" },
				},
				{
					label: "DNS",
					collapsed: true,
					autogenerate: { directory: "dns" },
				},
				{
					label: "MAIL",
					collapsed: true,
					autogenerate: { directory: "mail" },
				},
				{
					label: "Mutt",
					collapsed: true,
					autogenerate: { directory: "mutt" },
				},
				{
					label: "SpamAssassin",
					collapsed: true,
					autogenerate: { directory: "spamassassin" },
				},
				{
					label: "About",
					link: "about",
				},
			],
		}),
	],
});
