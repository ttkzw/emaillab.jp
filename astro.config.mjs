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
