import * as vue from 'vue';
import { VNodeChild, VNodeProps, HTMLAttributes, PropType, ButtonHTMLAttributes, CSSProperties, SVGAttributes, Ref, InputHTMLAttributes, ComputedRef, UnwrapRef } from 'vue';
import { JSX as JSX$1 } from 'vue/jsx-runtime';
import { RouteLocationRaw } from 'vue-router';
export * from '@cuboapp/ui-core/shared';

type AllIconName = "a-b" | "a-b-2" | "a-b-off" | "abacus" | "abacus-off" | "abc" | "access-point" | "access-point-off" | "accessible" | "accessible-off" | "acorn" | "acrobatic" | "activity" | "activity-heartbeat" | "ad" | "ad-2" | "ad-circle" | "ad-circle-off" | "ad-off" | "address-book" | "address-book-off" | "adjustments" | "adjustments-alt" | "adjustments-bolt" | "adjustments-cancel" | "adjustments-check" | "adjustments-code" | "adjustments-cog" | "adjustments-dollar" | "adjustments-down" | "adjustments-exclamation" | "adjustments-heart" | "adjustments-horizontal" | "adjustments-minus" | "adjustments-off" | "adjustments-pause" | "adjustments-pin" | "adjustments-plus" | "adjustments-question" | "adjustments-search" | "adjustments-share" | "adjustments-spark" | "adjustments-star" | "adjustments-up" | "adjustments-x" | "aerial-lift" | "affiliate" | "ai" | "ai-agent" | "ai-agents" | "ai-gateway" | "air-balloon" | "air-conditioning" | "air-conditioning-disabled" | "air-traffic-control" | "alarm" | "alarm-average" | "alarm-minus" | "alarm-off" | "alarm-plus" | "alarm-smoke" | "alarm-snooze" | "album" | "album-off" | "alert-circle" | "alert-circle-off" | "alert-hexagon" | "alert-hexagon-off" | "alert-octagon" | "alert-small" | "alert-small-off" | "alert-square" | "alert-square-rounded" | "alert-square-rounded-off" | "alert-triangle" | "alert-triangle-off" | "alien" | "align-box-bottom-center" | "align-box-bottom-left" | "align-box-bottom-right" | "align-box-center-bottom" | "align-box-center-middle" | "align-box-center-stretch" | "align-box-center-top" | "align-box-left-bottom" | "align-box-left-middle" | "align-box-left-stretch" | "align-box-left-top" | "align-box-right-bottom" | "align-box-right-middle" | "align-box-right-stretch" | "align-box-right-top" | "align-box-top-center" | "align-box-top-left" | "align-box-top-right" | "align-center" | "align-justified" | "align-left" | "align-left-2" | "align-right" | "align-right-2" | "alpha" | "alphabet-arabic" | "alphabet-bangla" | "alphabet-cyrillic" | "alphabet-greek" | "alphabet-hebrew" | "alphabet-korean" | "alphabet-latin" | "alphabet-polish" | "alphabet-runes" | "alphabet-thai" | "alt" | "ambulance" | "ampersand" | "analyze" | "analyze-off" | "anchor" | "anchor-off" | "angle" | "ankh" | "antenna" | "antenna-bars-1" | "antenna-bars-2" | "antenna-bars-3" | "antenna-bars-4" | "antenna-bars-5" | "antenna-bars-off" | "antenna-off" | "aperture" | "aperture-off" | "api" | "api-app" | "api-app-off" | "api-book" | "api-off" | "app-window" | "apple" | "apps" | "apps-off" | "archery-arrow" | "archive" | "archive-off" | "armchair" | "armchair-2" | "armchair-2-off" | "armchair-off" | "arrow-autofit-content" | "arrow-autofit-down" | "arrow-autofit-height" | "arrow-autofit-left" | "arrow-autofit-right" | "arrow-autofit-up" | "arrow-autofit-width" | "arrow-back" | "arrow-back-up" | "arrow-back-up-double" | "arrow-badge-down" | "arrow-badge-left" | "arrow-badge-right" | "arrow-badge-up" | "arrow-bar-both" | "arrow-bar-down" | "arrow-bar-left" | "arrow-bar-right" | "arrow-bar-to-down" | "arrow-bar-to-down-dashed" | "arrow-bar-to-left" | "arrow-bar-to-left-dashed" | "arrow-bar-to-right" | "arrow-bar-to-right-dashed" | "arrow-bar-to-up" | "arrow-bar-to-up-dashed" | "arrow-bar-up" | "arrow-bear-left" | "arrow-bear-left-2" | "arrow-bear-right" | "arrow-bear-right-2" | "arrow-big-down" | "arrow-big-down-line" | "arrow-big-down-lines" | "arrow-big-left" | "arrow-big-left-line" | "arrow-big-left-lines" | "arrow-big-right" | "arrow-big-right-line" | "arrow-big-right-lines" | "arrow-big-up" | "arrow-big-up-line" | "arrow-big-up-lines" | "arrow-bounce" | "arrow-capsule" | "arrow-curve-left" | "arrow-curve-right" | "arrow-down" | "arrow-down-bar" | "arrow-down-circle" | "arrow-down-dashed" | "arrow-down-from-arc" | "arrow-down-left" | "arrow-down-left-circle" | "arrow-down-rhombus" | "arrow-down-right" | "arrow-down-right-circle" | "arrow-down-square" | "arrow-down-tail" | "arrow-down-to-arc" | "arrow-elbow-left" | "arrow-elbow-right" | "arrow-fork" | "arrow-forward" | "arrow-forward-up" | "arrow-forward-up-double" | "arrow-guide" | "arrow-iteration" | "arrow-left" | "arrow-left-bar" | "arrow-left-circle" | "arrow-left-dashed" | "arrow-left-from-arc" | "arrow-left-rhombus" | "arrow-left-right" | "arrow-left-square" | "arrow-left-tail" | "arrow-left-to-arc" | "arrow-loop-left" | "arrow-loop-left-2" | "arrow-loop-right" | "arrow-loop-right-2" | "arrow-merge" | "arrow-merge-alt-left" | "arrow-merge-alt-right" | "arrow-merge-both" | "arrow-merge-left" | "arrow-merge-right" | "arrow-move-down" | "arrow-move-left" | "arrow-move-right" | "arrow-move-up" | "arrow-narrow-down" | "arrow-narrow-down-dashed" | "arrow-narrow-left" | "arrow-narrow-left-dashed" | "arrow-narrow-right" | "arrow-narrow-right-dashed" | "arrow-narrow-up" | "arrow-narrow-up-dashed" | "arrow-ramp-left" | "arrow-ramp-left-2" | "arrow-ramp-left-3" | "arrow-ramp-right" | "arrow-ramp-right-2" | "arrow-ramp-right-3" | "arrow-right" | "arrow-right-bar" | "arrow-right-circle" | "arrow-right-dashed" | "arrow-right-from-arc" | "arrow-right-rhombus" | "arrow-right-square" | "arrow-right-tail" | "arrow-right-to-arc" | "arrow-rotary-first-left" | "arrow-rotary-first-right" | "arrow-rotary-last-left" | "arrow-rotary-last-right" | "arrow-rotary-left" | "arrow-rotary-right" | "arrow-rotary-straight" | "arrow-roundabout-left" | "arrow-roundabout-right" | "arrow-sharp-turn-left" | "arrow-sharp-turn-right" | "arrow-up" | "arrow-up-bar" | "arrow-up-circle" | "arrow-up-dashed" | "arrow-up-from-arc" | "arrow-up-left" | "arrow-up-left-circle" | "arrow-up-rhombus" | "arrow-up-right" | "arrow-up-right-circle" | "arrow-up-square" | "arrow-up-tail" | "arrow-up-to-arc" | "arrow-wave-left-down" | "arrow-wave-left-up" | "arrow-wave-right-down" | "arrow-wave-right-up" | "arrow-zig-zag" | "arrows-cross" | "arrows-diagonal" | "arrows-diagonal-2" | "arrows-diagonal-minimize" | "arrows-diagonal-minimize-2" | "arrows-diff" | "arrows-double-ne-sw" | "arrows-double-nw-se" | "arrows-double-se-nw" | "arrows-double-sw-ne" | "arrows-down" | "arrows-down-up" | "arrows-exchange" | "arrows-exchange-2" | "arrows-horizontal" | "arrows-join" | "arrows-join-2" | "arrows-left" | "arrows-left-down" | "arrows-left-right" | "arrows-maximize" | "arrows-minimize" | "arrows-move" | "arrows-move-horizontal" | "arrows-move-vertical" | "arrows-random" | "arrows-right" | "arrows-right-down" | "arrows-right-left" | "arrows-shuffle" | "arrows-shuffle-2" | "arrows-sort" | "arrows-split" | "arrows-split-2" | "arrows-transfer-down" | "arrows-transfer-up" | "arrows-transfer-up-down" | "arrows-up" | "arrows-up-down" | "arrows-up-left" | "arrows-up-right" | "arrows-vertical" | "artboard" | "artboard-off" | "article" | "article-off" | "aspect-ratio" | "aspect-ratio-off" | "assembly" | "assembly-off" | "asset" | "asterisk" | "asterisk-simple" | "at" | "at-off" | "atom" | "atom-2" | "atom-off" | "augmented-reality" | "augmented-reality-2" | "augmented-reality-off" | "auth-2fa" | "automatic-gearbox" | "automation" | "avocado" | "award" | "award-off" | "axe" | "axis-x" | "axis-y" | "baby-bottle" | "baby-carriage" | "background" | "backhoe" | "backpack" | "backpack-off" | "backslash" | "backspace" | "badge" | "badge-2k" | "badge-3d" | "badge-3k" | "badge-4k" | "badge-5k" | "badge-8k" | "badge-ad" | "badge-ad-off" | "badge-ar" | "badge-cc" | "badge-hd" | "badge-off" | "badge-sd" | "badge-tm" | "badge-vo" | "badge-vr" | "badge-wc" | "badges" | "badges-off" | "baguette" | "ball-american-football" | "ball-american-football-off" | "ball-baseball" | "ball-basketball" | "ball-bowling" | "ball-football" | "ball-football-off" | "ball-tennis" | "ball-volleyball" | "balloon" | "balloon-off" | "ballpen" | "ballpen-off" | "ban" | "banana" | "bandage" | "bandage-off" | "barbell" | "barbell-off" | "barcode" | "barcode-off" | "barrel" | "barrel-off" | "barrier-block" | "barrier-block-off" | "baseline" | "baseline-density-large" | "baseline-density-medium" | "baseline-density-small" | "basket" | "basket-bolt" | "basket-cancel" | "basket-check" | "basket-code" | "basket-cog" | "basket-discount" | "basket-dollar" | "basket-down" | "basket-exclamation" | "basket-heart" | "basket-minus" | "basket-off" | "basket-pause" | "basket-pin" | "basket-plus" | "basket-question" | "basket-search" | "basket-share" | "basket-star" | "basket-up" | "basket-x" | "bat" | "bath" | "bath-off" | "battery" | "battery-1" | "battery-2" | "battery-3" | "battery-4" | "battery-automotive" | "battery-charging" | "battery-charging-2" | "battery-eco" | "battery-exclamation" | "battery-off" | "battery-spark" | "battery-vertical" | "battery-vertical-1" | "battery-vertical-2" | "battery-vertical-3" | "battery-vertical-4" | "battery-vertical-charging" | "battery-vertical-charging-2" | "battery-vertical-eco" | "battery-vertical-exclamation" | "battery-vertical-off" | "beach" | "beach-off" | "bed" | "bed-flat" | "bed-off" | "beer" | "beer-off" | "bell" | "bell-bolt" | "bell-cancel" | "bell-check" | "bell-code" | "bell-cog" | "bell-dollar" | "bell-down" | "bell-exclamation" | "bell-heart" | "bell-minus" | "bell-off" | "bell-pause" | "bell-pin" | "bell-plus" | "bell-question" | "bell-ringing" | "bell-ringing-2" | "bell-school" | "bell-search" | "bell-share" | "bell-star" | "bell-up" | "bell-x" | "bell-z" | "beta" | "bible" | "bike" | "bike-off" | "binary" | "binary-off" | "binary-tree" | "binary-tree-2" | "binoculars" | "biohazard" | "biohazard-off" | "blade" | "bleach" | "bleach-chlorine" | "bleach-no-chlorine" | "bleach-off" | "blend-mode" | "blender" | "blind" | "blob" | "blockquote" | "blocks" | "bluetooth" | "bluetooth-connected" | "bluetooth-off" | "bluetooth-x" | "blur" | "blur-off" | "bmp" | "body-scan" | "bold" | "bold-off" | "bolt" | "bolt-off" | "bomb" | "bone" | "bone-off" | "bong" | "bong-off" | "book" | "book-2" | "book-download" | "book-off" | "book-upload" | "bookmark" | "bookmark-ai" | "bookmark-edit" | "bookmark-minus" | "bookmark-off" | "bookmark-plus" | "bookmark-question" | "bookmarks" | "bookmarks-off" | "books" | "books-off" | "boom" | "border-all" | "border-bottom" | "border-bottom-plus" | "border-corner-ios" | "border-corner-pill" | "border-corner-rounded" | "border-corner-square" | "border-corners" | "border-horizontal" | "border-inner" | "border-left" | "border-left-plus" | "border-none" | "border-outer" | "border-radius" | "border-right" | "border-right-plus" | "border-sides" | "border-style" | "border-style-2" | "border-top" | "border-top-plus" | "border-vertical" | "bot-id" | "bottle" | "bottle-off" | "bounce-left" | "bounce-right" | "bow" | "bowl" | "bowl-chopsticks" | "bowl-spoon" | "bowling" | "box" | "box-align-bottom" | "box-align-bottom-left" | "box-align-bottom-right" | "box-align-left" | "box-align-right" | "box-align-top" | "box-align-top-left" | "box-align-top-right" | "box-margin" | "box-model" | "box-model-2" | "box-model-2-off" | "box-model-off" | "box-multiple" | "box-multiple-0" | "box-multiple-1" | "box-multiple-2" | "box-multiple-3" | "box-multiple-4" | "box-multiple-5" | "box-multiple-6" | "box-multiple-7" | "box-multiple-8" | "box-multiple-9" | "box-off" | "box-padding" | "braces" | "braces-off" | "brackets" | "brackets-angle" | "brackets-angle-off" | "brackets-contain" | "brackets-contain-end" | "brackets-contain-start" | "brackets-off" | "braille" | "brain" | "brand-4chan" | "brand-abstract" | "brand-adobe" | "brand-adobe-after-effect" | "brand-adobe-illustrator" | "brand-adobe-indesign" | "brand-adobe-photoshop" | "brand-adobe-premiere" | "brand-adobe-xd" | "brand-adonis-js" | "brand-airbnb" | "brand-airtable" | "brand-algolia" | "brand-alipay" | "brand-alpine-js" | "brand-amazon" | "brand-amd" | "brand-amie" | "brand-amigo" | "brand-among-us" | "brand-android" | "brand-angular" | "brand-ansible" | "brand-ao3" | "brand-appgallery" | "brand-apple" | "brand-apple-arcade" | "brand-apple-news" | "brand-apple-podcast" | "brand-appstore" | "brand-arc" | "brand-asana" | "brand-astro" | "brand-audible" | "brand-auth0" | "brand-aws" | "brand-azure" | "brand-backbone" | "brand-badoo" | "brand-baidu" | "brand-bandcamp" | "brand-bandlab" | "brand-beats" | "brand-bebo" | "brand-behance" | "brand-bilibili" | "brand-binance" | "brand-bing" | "brand-bitbucket" | "brand-blackberry" | "brand-blender" | "brand-blogger" | "brand-bluesky" | "brand-booking" | "brand-bootstrap" | "brand-bulma" | "brand-bumble" | "brand-bunpo" | "brand-c-sharp" | "brand-cake" | "brand-cakephp" | "brand-campaignmonitor" | "brand-carbon" | "brand-cashapp" | "brand-chrome" | "brand-cinema-4d" | "brand-citymapper" | "brand-cloudflare" | "brand-codecov" | "brand-codepen" | "brand-codesandbox" | "brand-cohost" | "brand-coinbase" | "brand-comedy-central" | "brand-coreos" | "brand-couchdb" | "brand-couchsurfing" | "brand-cpp" | "brand-craft" | "brand-crunchbase" | "brand-css3" | "brand-ctemplar" | "brand-cucumber" | "brand-cupra" | "brand-cypress" | "brand-d3" | "brand-databricks" | "brand-days-counter" | "brand-dcos" | "brand-debian" | "brand-deezer" | "brand-deliveroo" | "brand-deno" | "brand-denodo" | "brand-deviantart" | "brand-digg" | "brand-dingtalk" | "brand-discord" | "brand-disney" | "brand-disqus" | "brand-django" | "brand-docker" | "brand-doctrine" | "brand-dolby-digital" | "brand-douban" | "brand-dribbble" | "brand-dropbox" | "brand-drops" | "brand-drupal" | "brand-edge" | "brand-elastic" | "brand-electronic-arts" | "brand-ember" | "brand-envato" | "brand-etsy" | "brand-evernote" | "brand-facebook" | "brand-feedly" | "brand-figma" | "brand-filezilla" | "brand-finder" | "brand-firebase" | "brand-firefox" | "brand-fiverr" | "brand-flickr" | "brand-flightradar24" | "brand-flipboard" | "brand-flutter" | "brand-fortnite" | "brand-foursquare" | "brand-framer" | "brand-framer-motion" | "brand-funimation" | "brand-gatsby" | "brand-git" | "brand-github" | "brand-github-copilot" | "brand-gitlab" | "brand-gmail" | "brand-golang" | "brand-google" | "brand-google-analytics" | "brand-google-big-query" | "brand-google-drive" | "brand-google-fit" | "brand-google-home" | "brand-google-maps" | "brand-google-one" | "brand-google-photos" | "brand-google-play" | "brand-google-podcasts" | "brand-grammarly" | "brand-graphql" | "brand-gravatar" | "brand-grindr" | "brand-guardian" | "brand-gumroad" | "brand-hackerrank" | "brand-hbo" | "brand-headlessui" | "brand-hexo" | "brand-hipchat" | "brand-html5" | "brand-inertia" | "brand-infakt" | "brand-instagram" | "brand-intercom" | "brand-itch" | "brand-javascript" | "brand-jira" | "brand-juejin" | "brand-kako-talk" | "brand-kbin" | "brand-kick" | "brand-kickstarter" | "brand-kotlin" | "brand-laravel" | "brand-lastfm" | "brand-leetcode" | "brand-letterboxd" | "brand-line" | "brand-linkedin" | "brand-linktree" | "brand-linqpad" | "brand-livewire" | "brand-loom" | "brand-mailgun" | "brand-mantine" | "brand-mastercard" | "brand-mastodon" | "brand-matrix" | "brand-mcdonalds" | "brand-medium" | "brand-meetup" | "brand-mercedes" | "brand-messenger" | "brand-meta" | "brand-metabrainz" | "brand-minecraft" | "brand-miniprogram" | "brand-mixpanel" | "brand-monday" | "brand-mongodb" | "brand-my-oppo" | "brand-mysql" | "brand-national-geographic" | "brand-nem" | "brand-netbeans" | "brand-netease-music" | "brand-netflix" | "brand-nexo" | "brand-nextcloud" | "brand-nextjs" | "brand-nodejs" | "brand-nord-vpn" | "brand-notion" | "brand-npm" | "brand-nuxt" | "brand-nytimes" | "brand-oauth" | "brand-office" | "brand-ok-ru" | "brand-onedrive" | "brand-onlyfans" | "brand-open-source" | "brand-openai" | "brand-openvpn" | "brand-opera" | "brand-pagekit" | "brand-parsinta" | "brand-patreon" | "brand-paypal" | "brand-paypay" | "brand-peanut" | "brand-pepsi" | "brand-php" | "brand-picsart" | "brand-pinterest" | "brand-planetscale" | "brand-pnpm" | "brand-pocket" | "brand-polymer" | "brand-powershell" | "brand-printables" | "brand-prisma" | "brand-producthunt" | "brand-pushbullet" | "brand-pushover" | "brand-python" | "brand-qq" | "brand-radix-ui" | "brand-react" | "brand-react-native" | "brand-reason" | "brand-reddit" | "brand-redhat" | "brand-redux" | "brand-revolut" | "brand-rumble" | "brand-rust" | "brand-safari" | "brand-samsungpass" | "brand-sass" | "brand-sentry" | "brand-sharik" | "brand-shazam" | "brand-shopee" | "brand-sketch" | "brand-skype" | "brand-slack" | "brand-snapchat" | "brand-snapseed" | "brand-snowflake" | "brand-socket-io" | "brand-solidjs" | "brand-soundcloud" | "brand-spacehey" | "brand-speedtest" | "brand-spotify" | "brand-stackoverflow" | "brand-stackshare" | "brand-steam" | "brand-stellar" | "brand-stocktwits" | "brand-storj" | "brand-storybook" | "brand-storytel" | "brand-strava" | "brand-stripe" | "brand-sublime-text" | "brand-sugarizer" | "brand-supabase" | "brand-superhuman" | "brand-supernova" | "brand-surfshark" | "brand-svelte" | "brand-swift" | "brand-symfony" | "brand-tabler" | "brand-tabnine" | "brand-tailwind" | "brand-taobao" | "brand-teams" | "brand-ted" | "brand-telegram" | "brand-terraform" | "brand-tesla" | "brand-tether" | "brand-thingiverse" | "brand-threads" | "brand-threejs" | "brand-tidal" | "brand-tiktok" | "brand-tinder" | "brand-topbuzz" | "brand-torchain" | "brand-toyota" | "brand-trello" | "brand-tripadvisor" | "brand-tumblr" | "brand-twilio" | "brand-twitch" | "brand-twitter" | "brand-typescript" | "brand-uber" | "brand-ubuntu" | "brand-unity" | "brand-unsplash" | "brand-upwork" | "brand-valorant" | "brand-vechain" | "brand-vercel" | "brand-vimeo" | "brand-vinted" | "brand-visa" | "brand-visual-studio" | "brand-vite" | "brand-vivaldi" | "brand-vk" | "brand-vlc" | "brand-volkswagen" | "brand-vsco" | "brand-vscode" | "brand-vue" | "brand-walmart" | "brand-waze" | "brand-webflow" | "brand-wechat" | "brand-weibo" | "brand-whatsapp" | "brand-wikipedia" | "brand-windows" | "brand-windy" | "brand-wish" | "brand-wix" | "brand-wordpress" | "brand-x" | "brand-xamarin" | "brand-xbox" | "brand-xdeep" | "brand-xing" | "brand-yahoo" | "brand-yandex" | "brand-yarn" | "brand-yatse" | "brand-ycombinator" | "brand-youtube" | "brand-youtube-kids" | "brand-zalando" | "brand-zapier" | "brand-zeit" | "brand-zhihu" | "brand-zoom" | "brand-zulip" | "brand-zwift" | "bread" | "bread-off" | "briefcase" | "briefcase-2" | "briefcase-off" | "brightness" | "brightness-2" | "brightness-auto" | "brightness-down" | "brightness-half" | "brightness-off" | "brightness-up" | "broadcast" | "broadcast-off" | "browser" | "browser-check" | "browser-maximize" | "browser-minus" | "browser-off" | "browser-plus" | "browser-share" | "browser-x" | "brush" | "brush-off" | "bubble" | "bubble-minus" | "bubble-plus" | "bubble-tea" | "bubble-tea-2" | "bubble-text" | "bubble-x" | "bucket" | "bucket-droplet" | "bucket-off" | "bug" | "bug-off" | "building" | "building-airport" | "building-arch" | "building-bank" | "building-bridge" | "building-bridge-2" | "building-broadcast-tower" | "building-burj-al-arab" | "building-carousel" | "building-castle" | "building-church" | "building-circus" | "building-cog" | "building-community" | "building-cottage" | "building-eiffel-tower" | "building-estate" | "building-factory" | "building-factory-2" | "building-fortress" | "building-hospital" | "building-lighthouse" | "building-minus" | "building-monument" | "building-mosque" | "building-off" | "building-pavilion" | "building-plus" | "building-skyscraper" | "building-stadium" | "building-store" | "building-tunnel" | "building-warehouse" | "building-wind-turbine" | "buildings" | "bulb" | "bulb-off" | "bulldozer" | "burger" | "bus" | "bus-off" | "bus-stop" | "businessplan" | "butterfly" | "cactus" | "cactus-off" | "cake" | "cake-off" | "cake-roll" | "calculator" | "calculator-off" | "calendar" | "calendar-bolt" | "calendar-cancel" | "calendar-check" | "calendar-clock" | "calendar-code" | "calendar-cog" | "calendar-dollar" | "calendar-dot" | "calendar-down" | "calendar-due" | "calendar-event" | "calendar-exclamation" | "calendar-heart" | "calendar-minus" | "calendar-month" | "calendar-off" | "calendar-pause" | "calendar-pin" | "calendar-plus" | "calendar-question" | "calendar-repeat" | "calendar-sad" | "calendar-search" | "calendar-share" | "calendar-smile" | "calendar-star" | "calendar-stats" | "calendar-time" | "calendar-up" | "calendar-user" | "calendar-week" | "calendar-x" | "camera" | "camera-ai" | "camera-bitcoin" | "camera-bolt" | "camera-cancel" | "camera-check" | "camera-code" | "camera-cog" | "camera-dollar" | "camera-down" | "camera-exclamation" | "camera-heart" | "camera-minus" | "camera-moon" | "camera-off" | "camera-pause" | "camera-pin" | "camera-plus" | "camera-question" | "camera-rotate" | "camera-search" | "camera-selfie" | "camera-share" | "camera-spark" | "camera-star" | "camera-up" | "camera-x" | "camper" | "campfire" | "canary" | "cancel" | "candle" | "candy" | "candy-off" | "cane" | "cannabis" | "cap-projecting" | "cap-rounded" | "cap-straight" | "capsule" | "capsule-horizontal" | "capture" | "capture-off" | "car" | "car-4wd" | "car-crane" | "car-crash" | "car-door" | "car-fan" | "car-fan-1" | "car-fan-2" | "car-fan-3" | "car-fan-auto" | "car-garage" | "car-lifter" | "car-off" | "car-off-road" | "car-suspension" | "car-suv" | "car-turbine" | "carambola" | "caravan" | "cardboards" | "cardboards-off" | "cards" | "caret-down" | "caret-left" | "caret-left-right" | "caret-right" | "caret-up" | "caret-up-down" | "carousel-horizontal" | "carousel-vertical" | "carrot" | "carrot-off" | "cash" | "cash-banknote" | "cash-banknote-edit" | "cash-banknote-heart" | "cash-banknote-minus" | "cash-banknote-move" | "cash-banknote-move-back" | "cash-banknote-off" | "cash-banknote-plus" | "cash-edit" | "cash-heart" | "cash-minus" | "cash-move" | "cash-move-back" | "cash-off" | "cash-plus" | "cash-register" | "cast" | "cast-off" | "cat" | "category" | "category-2" | "category-minus" | "category-plus" | "ce" | "ce-off" | "cell" | "cell-signal-1" | "cell-signal-2" | "cell-signal-3" | "cell-signal-4" | "cell-signal-5" | "cell-signal-off" | "certificate" | "certificate-2" | "certificate-2-off" | "certificate-off" | "chair-director" | "chalkboard" | "chalkboard-off" | "chalkboard-teacher" | "charging-pile" | "chart-arcs" | "chart-arcs-3" | "chart-area" | "chart-area-line" | "chart-arrows" | "chart-arrows-vertical" | "chart-bar" | "chart-bar-off" | "chart-bar-popular" | "chart-bubble" | "chart-candle" | "chart-circles" | "chart-cohort" | "chart-column" | "chart-covariate" | "chart-donut" | "chart-donut-2" | "chart-donut-3" | "chart-donut-4" | "chart-dots" | "chart-dots-2" | "chart-dots-3" | "chart-funnel" | "chart-grid-dots" | "chart-histogram" | "chart-infographic" | "chart-line" | "chart-pie" | "chart-pie-2" | "chart-pie-3" | "chart-pie-4" | "chart-pie-off" | "chart-ppf" | "chart-radar" | "chart-sankey" | "chart-scatter" | "chart-scatter-3d" | "chart-treemap" | "check" | "checkbox" | "checklist" | "checks" | "checkup-list" | "cheese" | "chef-hat" | "chef-hat-off" | "cherry" | "chess" | "chess-bishop" | "chess-king" | "chess-knight" | "chess-queen" | "chess-rook" | "chevron-compact-down" | "chevron-compact-left" | "chevron-compact-right" | "chevron-compact-up" | "chevron-down" | "chevron-down-left" | "chevron-down-right" | "chevron-left" | "chevron-left-pipe" | "chevron-right" | "chevron-right-pipe" | "chevron-up" | "chevron-up-left" | "chevron-up-right" | "chevrons-down" | "chevrons-down-left" | "chevrons-down-right" | "chevrons-left" | "chevrons-right" | "chevrons-up" | "chevrons-up-left" | "chevrons-up-right" | "chisel" | "chocolate" | "christmas-ball" | "christmas-tree" | "christmas-tree-off" | "circle" | "circle-arrow-down" | "circle-arrow-down-left" | "circle-arrow-down-right" | "circle-arrow-left" | "circle-arrow-right" | "circle-arrow-up" | "circle-arrow-up-left" | "circle-arrow-up-right" | "circle-asterisk" | "circle-caret-down" | "circle-caret-left" | "circle-caret-right" | "circle-caret-up" | "circle-check" | "circle-chevron-down" | "circle-chevron-left" | "circle-chevron-right" | "circle-chevron-up" | "circle-chevrons-down" | "circle-chevrons-left" | "circle-chevrons-right" | "circle-chevrons-up" | "circle-dashed" | "circle-dashed-check" | "circle-dashed-letter-a" | "circle-dashed-letter-b" | "circle-dashed-letter-c" | "circle-dashed-letter-d" | "circle-dashed-letter-e" | "circle-dashed-letter-f" | "circle-dashed-letter-g" | "circle-dashed-letter-h" | "circle-dashed-letter-i" | "circle-dashed-letter-j" | "circle-dashed-letter-k" | "circle-dashed-letter-l" | "circle-dashed-letter-m" | "circle-dashed-letter-n" | "circle-dashed-letter-o" | "circle-dashed-letter-p" | "circle-dashed-letter-q" | "circle-dashed-letter-r" | "circle-dashed-letter-s" | "circle-dashed-letter-t" | "circle-dashed-letter-u" | "circle-dashed-letter-v" | "circle-dashed-letter-w" | "circle-dashed-letter-x" | "circle-dashed-letter-y" | "circle-dashed-letter-z" | "circle-dashed-minus" | "circle-dashed-number-0" | "circle-dashed-number-1" | "circle-dashed-number-2" | "circle-dashed-number-3" | "circle-dashed-number-4" | "circle-dashed-number-5" | "circle-dashed-number-6" | "circle-dashed-number-7" | "circle-dashed-number-8" | "circle-dashed-number-9" | "circle-dashed-percentage" | "circle-dashed-plus" | "circle-dashed-x" | "circle-dot" | "circle-dotted" | "circle-dotted-letter-a" | "circle-dotted-letter-b" | "circle-dotted-letter-c" | "circle-dotted-letter-d" | "circle-dotted-letter-e" | "circle-dotted-letter-f" | "circle-dotted-letter-g" | "circle-dotted-letter-h" | "circle-dotted-letter-i" | "circle-dotted-letter-j" | "circle-dotted-letter-k" | "circle-dotted-letter-l" | "circle-dotted-letter-m" | "circle-dotted-letter-n" | "circle-dotted-letter-o" | "circle-dotted-letter-p" | "circle-dotted-letter-q" | "circle-dotted-letter-r" | "circle-dotted-letter-s" | "circle-dotted-letter-t" | "circle-dotted-letter-u" | "circle-dotted-letter-v" | "circle-dotted-letter-w" | "circle-dotted-letter-x" | "circle-dotted-letter-y" | "circle-dotted-letter-z" | "circle-half" | "circle-half-2" | "circle-half-vertical" | "circle-key" | "circle-letter-a" | "circle-letter-b" | "circle-letter-c" | "circle-letter-d" | "circle-letter-e" | "circle-letter-f" | "circle-letter-g" | "circle-letter-h" | "circle-letter-i" | "circle-letter-j" | "circle-letter-k" | "circle-letter-l" | "circle-letter-m" | "circle-letter-n" | "circle-letter-o" | "circle-letter-p" | "circle-letter-q" | "circle-letter-r" | "circle-letter-s" | "circle-letter-t" | "circle-letter-u" | "circle-letter-v" | "circle-letter-w" | "circle-letter-x" | "circle-letter-y" | "circle-letter-z" | "circle-minus" | "circle-minus-2" | "circle-number-0" | "circle-number-1" | "circle-number-2" | "circle-number-3" | "circle-number-4" | "circle-number-5" | "circle-number-6" | "circle-number-7" | "circle-number-8" | "circle-number-9" | "circle-off" | "circle-open-arrow-down" | "circle-open-arrow-left" | "circle-open-arrow-right" | "circle-open-arrow-up" | "circle-percentage" | "circle-plus" | "circle-plus-2" | "circle-plus-minus" | "circle-rectangle" | "circle-rectangle-off" | "circle-square" | "circle-triangle" | "circle-x" | "circles" | "circles-relation" | "circuit-ammeter" | "circuit-battery" | "circuit-bulb" | "circuit-capacitor" | "circuit-capacitor-polarized" | "circuit-cell" | "circuit-cell-plus" | "circuit-changeover" | "circuit-diode" | "circuit-diode-zener" | "circuit-ground" | "circuit-ground-digital" | "circuit-inductor" | "circuit-motor" | "circuit-pushbutton" | "circuit-resistor" | "circuit-switch-closed" | "circuit-switch-open" | "circuit-voltmeter" | "clear-all" | "clear-formatting" | "clef" | "clef-staff" | "click" | "cliff-jumping" | "clipboard" | "clipboard-check" | "clipboard-copy" | "clipboard-data" | "clipboard-heart" | "clipboard-list" | "clipboard-off" | "clipboard-plus" | "clipboard-search" | "clipboard-smile" | "clipboard-text" | "clipboard-typography" | "clipboard-x" | "clock" | "clock-12" | "clock-2" | "clock-24" | "clock-bitcoin" | "clock-bolt" | "clock-cancel" | "clock-check" | "clock-code" | "clock-cog" | "clock-dollar" | "clock-down" | "clock-edit" | "clock-exclamation" | "clock-heart" | "clock-hour-1" | "clock-hour-10" | "clock-hour-11" | "clock-hour-12" | "clock-hour-2" | "clock-hour-3" | "clock-hour-4" | "clock-hour-5" | "clock-hour-6" | "clock-hour-7" | "clock-hour-8" | "clock-hour-9" | "clock-minus" | "clock-off" | "clock-pause" | "clock-pin" | "clock-play" | "clock-plus" | "clock-question" | "clock-record" | "clock-search" | "clock-share" | "clock-shield" | "clock-star" | "clock-stop" | "clock-up" | "clock-x" | "clothes-rack" | "clothes-rack-off" | "cloud" | "cloud-bitcoin" | "cloud-bolt" | "cloud-cancel" | "cloud-check" | "cloud-code" | "cloud-cog" | "cloud-computing" | "cloud-data-connection" | "cloud-dollar" | "cloud-down" | "cloud-download" | "cloud-exclamation" | "cloud-fog" | "cloud-heart" | "cloud-lock" | "cloud-lock-open" | "cloud-minus" | "cloud-network" | "cloud-off" | "cloud-pause" | "cloud-pin" | "cloud-plus" | "cloud-question" | "cloud-rain" | "cloud-search" | "cloud-share" | "cloud-snow" | "cloud-star" | "cloud-storm" | "cloud-up" | "cloud-upload" | "cloud-x" | "clover" | "clover-2" | "clubs" | "code" | "code-ai" | "code-asterisk" | "code-circle" | "code-circle-2" | "code-dots" | "code-minus" | "code-off" | "code-plus" | "code-variable" | "code-variable-minus" | "code-variable-plus" | "codeblock" | "coffee" | "coffee-off" | "coffin" | "coin" | "coin-bitcoin" | "coin-euro" | "coin-monero" | "coin-off" | "coin-pound" | "coin-rupee" | "coin-taka" | "coin-yen" | "coin-yuan" | "coins" | "color-filter" | "color-picker" | "color-picker-off" | "color-swatch" | "color-swatch-off" | "column-insert-left" | "column-insert-right" | "column-remove" | "columns" | "columns-1" | "columns-2" | "columns-3" | "columns-off" | "comet" | "command" | "command-off" | "compass" | "compass-off" | "components" | "components-off" | "cone" | "cone-2" | "cone-off" | "cone-plus" | "confetti" | "confetti-off" | "confucius" | "congruent-to" | "connection" | "container" | "container-off" | "contract" | "contrast" | "contrast-2" | "contrast-2-off" | "contrast-off" | "cooker" | "cookie" | "cookie-man" | "cookie-off" | "copy" | "copy-check" | "copy-minus" | "copy-off" | "copy-plus" | "copy-x" | "copyleft" | "copyleft-off" | "copyright" | "copyright-off" | "corner-down-left" | "corner-down-left-double" | "corner-down-right" | "corner-down-right-double" | "corner-left-down" | "corner-left-down-double" | "corner-left-up" | "corner-left-up-double" | "corner-right-down" | "corner-right-down-double" | "corner-right-up" | "corner-right-up-double" | "corner-up-left" | "corner-up-left-double" | "corner-up-right" | "corner-up-right-double" | "cpu" | "cpu-2" | "cpu-off" | "crane" | "crane-off" | "creative-commons" | "creative-commons-by" | "creative-commons-nc" | "creative-commons-nd" | "creative-commons-off" | "creative-commons-sa" | "creative-commons-zero" | "credit-card" | "credit-card-hand" | "credit-card-off" | "credit-card-pay" | "credit-card-refund" | "credits" | "cricket" | "crop" | "crop-1-1" | "crop-16-9" | "crop-3-2" | "crop-5-4" | "crop-7-5" | "crop-landscape" | "crop-portrait" | "cross" | "cross-off" | "crosshair" | "crown" | "crown-off" | "crutches" | "crutches-off" | "crystal-ball" | "csv" | "cube" | "cube-3d-sphere" | "cube-3d-sphere-off" | "cube-off" | "cube-plus" | "cube-send" | "cube-spark" | "cube-unfolded" | "cup" | "cup-off" | "curling" | "curly-loop" | "currency" | "currency-afghani" | "currency-bahraini" | "currency-baht" | "currency-bitcoin" | "currency-cent" | "currency-dinar" | "currency-dirham" | "currency-dogecoin" | "currency-dollar" | "currency-dollar-australian" | "currency-dollar-brunei" | "currency-dollar-canadian" | "currency-dollar-guyanese" | "currency-dollar-off" | "currency-dollar-singapore" | "currency-dollar-zimbabwean" | "currency-dong" | "currency-dram" | "currency-ethereum" | "currency-euro" | "currency-euro-off" | "currency-florin" | "currency-forint" | "currency-frank" | "currency-guarani" | "currency-hryvnia" | "currency-husd" | "currency-iranian-rial" | "currency-kip" | "currency-krone-czech" | "currency-krone-danish" | "currency-krone-swedish" | "currency-lari" | "currency-leu" | "currency-lira" | "currency-litecoin" | "currency-lyd" | "currency-manat" | "currency-monero" | "currency-naira" | "currency-nano" | "currency-off" | "currency-paanga" | "currency-peso" | "currency-pound" | "currency-pound-off" | "currency-quetzal" | "currency-real" | "currency-renminbi" | "currency-ripple" | "currency-riyal" | "currency-rubel" | "currency-rufiyaa" | "currency-rupee" | "currency-rupee-nepalese" | "currency-shekel" | "currency-solana" | "currency-som" | "currency-taka" | "currency-tenge" | "currency-tether" | "currency-tugrik" | "currency-won" | "currency-xrp" | "currency-yen" | "currency-yen-off" | "currency-yuan" | "currency-zcash" | "currency-zloty" | "current-location" | "current-location-off" | "cursor-off" | "cursor-text" | "cut" | "cylinder" | "cylinder-off" | "cylinder-plus" | "dashboard" | "dashboard-off" | "database" | "database-cog" | "database-dollar" | "database-edit" | "database-exclamation" | "database-export" | "database-heart" | "database-import" | "database-leak" | "database-minus" | "database-off" | "database-plus" | "database-search" | "database-share" | "database-smile" | "database-star" | "database-x" | "deaf" | "decimal" | "deer" | "delta" | "dental" | "dental-broken" | "dental-off" | "deselect" | "desk" | "details" | "details-off" | "device-3d-camera" | "device-3d-lens" | "device-airpods" | "device-airpods-case" | "device-airtag" | "device-analytics" | "device-audio-tape" | "device-camera-phone" | "device-cctv" | "device-cctv-off" | "device-computer-camera" | "device-computer-camera-2" | "device-computer-camera-off" | "device-desktop" | "device-desktop-analytics" | "device-desktop-bolt" | "device-desktop-cancel" | "device-desktop-check" | "device-desktop-code" | "device-desktop-cog" | "device-desktop-dollar" | "device-desktop-down" | "device-desktop-exclamation" | "device-desktop-heart" | "device-desktop-minus" | "device-desktop-off" | "device-desktop-pause" | "device-desktop-pin" | "device-desktop-plus" | "device-desktop-question" | "device-desktop-search" | "device-desktop-share" | "device-desktop-star" | "device-desktop-up" | "device-desktop-x" | "device-floppy" | "device-gamepad" | "device-gamepad-2" | "device-gamepad-3" | "device-heart-monitor" | "device-imac" | "device-imac-bolt" | "device-imac-cancel" | "device-imac-check" | "device-imac-code" | "device-imac-cog" | "device-imac-dollar" | "device-imac-down" | "device-imac-exclamation" | "device-imac-heart" | "device-imac-minus" | "device-imac-off" | "device-imac-pause" | "device-imac-pin" | "device-imac-plus" | "device-imac-question" | "device-imac-search" | "device-imac-share" | "device-imac-star" | "device-imac-up" | "device-imac-x" | "device-ipad" | "device-ipad-bolt" | "device-ipad-cancel" | "device-ipad-check" | "device-ipad-code" | "device-ipad-cog" | "device-ipad-dollar" | "device-ipad-down" | "device-ipad-exclamation" | "device-ipad-heart" | "device-ipad-horizontal" | "device-ipad-horizontal-bolt" | "device-ipad-horizontal-cancel" | "device-ipad-horizontal-check" | "device-ipad-horizontal-code" | "device-ipad-horizontal-cog" | "device-ipad-horizontal-dollar" | "device-ipad-horizontal-down" | "device-ipad-horizontal-exclamation" | "device-ipad-horizontal-heart" | "device-ipad-horizontal-minus" | "device-ipad-horizontal-off" | "device-ipad-horizontal-pause" | "device-ipad-horizontal-pin" | "device-ipad-horizontal-plus" | "device-ipad-horizontal-question" | "device-ipad-horizontal-search" | "device-ipad-horizontal-share" | "device-ipad-horizontal-star" | "device-ipad-horizontal-up" | "device-ipad-horizontal-x" | "device-ipad-minus" | "device-ipad-off" | "device-ipad-pause" | "device-ipad-pin" | "device-ipad-plus" | "device-ipad-question" | "device-ipad-search" | "device-ipad-share" | "device-ipad-star" | "device-ipad-up" | "device-ipad-x" | "device-landline-phone" | "device-laptop" | "device-laptop-off" | "device-mobile" | "device-mobile-bolt" | "device-mobile-cancel" | "device-mobile-charging" | "device-mobile-check" | "device-mobile-code" | "device-mobile-cog" | "device-mobile-dollar" | "device-mobile-down" | "device-mobile-exclamation" | "device-mobile-heart" | "device-mobile-message" | "device-mobile-minus" | "device-mobile-off" | "device-mobile-pause" | "device-mobile-pin" | "device-mobile-plus" | "device-mobile-question" | "device-mobile-rotated" | "device-mobile-search" | "device-mobile-share" | "device-mobile-star" | "device-mobile-up" | "device-mobile-vibration" | "device-mobile-x" | "device-nintendo" | "device-nintendo-off" | "device-projector" | "device-remote" | "device-screen" | "device-sd-card" | "device-sim" | "device-sim-1" | "device-sim-2" | "device-sim-3" | "device-speaker" | "device-speaker-off" | "device-tablet" | "device-tablet-bolt" | "device-tablet-cancel" | "device-tablet-check" | "device-tablet-code" | "device-tablet-cog" | "device-tablet-dollar" | "device-tablet-down" | "device-tablet-exclamation" | "device-tablet-heart" | "device-tablet-minus" | "device-tablet-off" | "device-tablet-pause" | "device-tablet-pin" | "device-tablet-plus" | "device-tablet-question" | "device-tablet-search" | "device-tablet-share" | "device-tablet-star" | "device-tablet-up" | "device-tablet-x" | "device-tv" | "device-tv-off" | "device-tv-old" | "device-unknown" | "device-usb" | "device-vision-pro" | "device-watch" | "device-watch-bolt" | "device-watch-cancel" | "device-watch-check" | "device-watch-code" | "device-watch-cog" | "device-watch-dollar" | "device-watch-down" | "device-watch-exclamation" | "device-watch-heart" | "device-watch-minus" | "device-watch-off" | "device-watch-pause" | "device-watch-pin" | "device-watch-plus" | "device-watch-question" | "device-watch-search" | "device-watch-share" | "device-watch-star" | "device-watch-stats" | "device-watch-stats-2" | "device-watch-up" | "device-watch-x" | "devices" | "devices-2" | "devices-bolt" | "devices-cancel" | "devices-check" | "devices-code" | "devices-cog" | "devices-dollar" | "devices-down" | "devices-exclamation" | "devices-heart" | "devices-minus" | "devices-off" | "devices-pause" | "devices-pc" | "devices-pc-off" | "devices-pin" | "devices-plus" | "devices-question" | "devices-search" | "devices-share" | "devices-star" | "devices-up" | "devices-x" | "diabolo" | "diabolo-off" | "diabolo-plus" | "dialpad" | "dialpad-off" | "diamond" | "diamond-off" | "diamonds" | "diaper" | "dice" | "dice-1" | "dice-2" | "dice-3" | "dice-4" | "dice-5" | "dice-6" | "dimensions" | "direction" | "direction-arrows" | "direction-horizontal" | "direction-sign" | "direction-sign-off" | "directions" | "directions-off" | "disabled" | "disabled-2" | "disabled-off" | "disc" | "disc-golf" | "disc-off" | "discount" | "discount-off" | "divide" | "dna" | "dna-2" | "dna-2-off" | "dna-off" | "dog" | "dog-bowl" | "door" | "door-enter" | "door-exit" | "door-hanger" | "door-off" | "dots" | "dots-circle-horizontal" | "dots-diagonal" | "dots-diagonal-2" | "dots-vertical" | "download" | "download-off" | "drag-drop" | "drag-drop-2" | "drone" | "drone-off" | "drop-circle" | "droplet" | "droplet-bolt" | "droplet-cancel" | "droplet-check" | "droplet-code" | "droplet-cog" | "droplet-dollar" | "droplet-down" | "droplet-exclamation" | "droplet-half" | "droplet-half-2" | "droplet-heart" | "droplet-minus" | "droplet-off" | "droplet-pause" | "droplet-pin" | "droplet-plus" | "droplet-question" | "droplet-search" | "droplet-share" | "droplet-star" | "droplet-up" | "droplet-x" | "droplets" | "dual-screen" | "dumbbell" | "dumpling" | "e-passport" | "ear" | "ear-off" | "ear-scan" | "earphone-bluetooth" | "ease-in" | "ease-in-control-point" | "ease-in-out" | "ease-in-out-control-points" | "ease-out" | "ease-out-control-point" | "edit" | "edit-circle" | "edit-circle-off" | "edit-off" | "egg" | "egg-cracked" | "egg-fried" | "egg-off" | "eggs" | "elevator" | "elevator-off" | "email-stamp" | "emergency-bed" | "empathize" | "empathize-off" | "emphasis" | "engine" | "engine-off" | "equal" | "equal-double" | "equal-not" | "eraser" | "eraser-off" | "error-404" | "error-404-off" | "escalator" | "escalator-down" | "escalator-up" | "exchange" | "exchange-off" | "exclamation-circle" | "exclamation-mark" | "exclamation-mark-off" | "exercise-ball" | "explicit" | "explicit-off" | "exposure" | "exposure-0" | "exposure-minus-1" | "exposure-minus-2" | "exposure-off" | "exposure-plus-1" | "exposure-plus-2" | "external-link" | "external-link-off" | "eye" | "eye-bitcoin" | "eye-bolt" | "eye-cancel" | "eye-check" | "eye-closed" | "eye-code" | "eye-cog" | "eye-discount" | "eye-dollar" | "eye-dotted" | "eye-down" | "eye-edit" | "eye-exclamation" | "eye-heart" | "eye-minus" | "eye-off" | "eye-pause" | "eye-pin" | "eye-plus" | "eye-question" | "eye-search" | "eye-share" | "eye-spark" | "eye-star" | "eye-table" | "eye-up" | "eye-x" | "eyeglass" | "eyeglass-2" | "eyeglass-off" | "face-id" | "face-id-error" | "face-mask" | "face-mask-off" | "fall" | "favicon" | "feather" | "feather-off" | "fence" | "fence-off" | "ferry" | "fidget-spinner" | "file" | "file-3d" | "file-ai" | "file-alert" | "file-analytics" | "file-arrow-left" | "file-arrow-right" | "file-barcode" | "file-bitcoin" | "file-broken" | "file-certificate" | "file-chart" | "file-check" | "file-code" | "file-code-2" | "file-cv" | "file-database" | "file-delta" | "file-description" | "file-diff" | "file-digit" | "file-dislike" | "file-dollar" | "file-dots" | "file-download" | "file-euro" | "file-excel" | "file-export" | "file-function" | "file-horizontal" | "file-import" | "file-infinity" | "file-info" | "file-invoice" | "file-isr" | "file-lambda" | "file-like" | "file-minus" | "file-music" | "file-neutral" | "file-off" | "file-orientation" | "file-pencil" | "file-percent" | "file-phone" | "file-plus" | "file-power" | "file-report" | "file-rss" | "file-sad" | "file-scissors" | "file-search" | "file-settings" | "file-shredder" | "file-signal" | "file-smile" | "file-spark" | "file-spreadsheet" | "file-stack" | "file-star" | "file-symlink" | "file-text" | "file-text-ai" | "file-text-shield" | "file-text-spark" | "file-time" | "file-type-bmp" | "file-type-css" | "file-type-csv" | "file-type-doc" | "file-type-docx" | "file-type-html" | "file-type-jpg" | "file-type-js" | "file-type-jsx" | "file-type-pdf" | "file-type-php" | "file-type-png" | "file-type-ppt" | "file-type-rs" | "file-type-sql" | "file-type-svg" | "file-type-ts" | "file-type-tsx" | "file-type-txt" | "file-type-vue" | "file-type-xls" | "file-type-xml" | "file-type-zip" | "file-typography" | "file-unknown" | "file-upload" | "file-vector" | "file-word" | "file-x" | "file-zip" | "files" | "files-off" | "filter" | "filter-2" | "filter-2-bolt" | "filter-2-cancel" | "filter-2-check" | "filter-2-code" | "filter-2-cog" | "filter-2-discount" | "filter-2-dollar" | "filter-2-down" | "filter-2-edit" | "filter-2-exclamation" | "filter-2-minus" | "filter-2-pause" | "filter-2-pin" | "filter-2-plus" | "filter-2-question" | "filter-2-search" | "filter-2-share" | "filter-2-spark" | "filter-2-up" | "filter-2-x" | "filter-bolt" | "filter-cancel" | "filter-check" | "filter-code" | "filter-cog" | "filter-discount" | "filter-dollar" | "filter-down" | "filter-edit" | "filter-exclamation" | "filter-heart" | "filter-minus" | "filter-off" | "filter-pause" | "filter-pin" | "filter-plus" | "filter-question" | "filter-search" | "filter-share" | "filter-spark" | "filter-star" | "filter-up" | "filter-x" | "filters" | "fingerprint" | "fingerprint-off" | "fingerprint-scan" | "fire-extinguisher" | "fire-hydrant" | "fire-hydrant-off" | "firetruck" | "firewall-check" | "firewall-flame" | "first-aid-kit" | "first-aid-kit-off" | "fish" | "fish-bone" | "fish-christianity" | "fish-hook" | "fish-hook-off" | "fish-off" | "flag" | "flag-2" | "flag-2-off" | "flag-3" | "flag-bitcoin" | "flag-bolt" | "flag-cancel" | "flag-check" | "flag-code" | "flag-cog" | "flag-discount" | "flag-dollar" | "flag-down" | "flag-exclamation" | "flag-heart" | "flag-minus" | "flag-off" | "flag-pause" | "flag-pin" | "flag-plus" | "flag-question" | "flag-search" | "flag-share" | "flag-spark" | "flag-star" | "flag-up" | "flag-x" | "flame" | "flame-off" | "flare" | "flask" | "flask-2" | "flask-2-off" | "flask-off" | "flip-flops" | "flip-horizontal" | "flip-vertical" | "float-center" | "float-left" | "float-none" | "float-right" | "flood" | "flower" | "flower-off" | "focus" | "focus-2" | "focus-auto" | "focus-centered" | "fold" | "fold-down" | "fold-up" | "folder" | "folder-bolt" | "folder-cancel" | "folder-check" | "folder-code" | "folder-cog" | "folder-dollar" | "folder-down" | "folder-exclamation" | "folder-heart" | "folder-minus" | "folder-off" | "folder-open" | "folder-pause" | "folder-pin" | "folder-plus" | "folder-question" | "folder-root" | "folder-search" | "folder-share" | "folder-star" | "folder-symlink" | "folder-up" | "folder-x" | "folders" | "folders-off" | "foodsteps" | "forbid" | "forbid-2" | "forklift" | "forms" | "fountain" | "fountain-off" | "frame" | "frame-off" | "free-rights" | "freeze-column" | "freeze-row" | "freeze-row-column" | "fridge" | "fridge-off" | "friends" | "friends-off" | "frustum" | "frustum-off" | "frustum-plus" | "function" | "function-off" | "galaxy" | "garden-cart" | "garden-cart-off" | "gas-station" | "gas-station-off" | "gauge" | "gauge-off" | "gavel" | "gender-agender" | "gender-androgyne" | "gender-bigender" | "gender-demiboy" | "gender-demigirl" | "gender-epicene" | "gender-female" | "gender-femme" | "gender-genderfluid" | "gender-genderless" | "gender-genderqueer" | "gender-hermaphrodite" | "gender-intergender" | "gender-male" | "gender-neutrois" | "gender-third" | "gender-transgender" | "gender-trasvesti" | "geometry" | "ghost" | "ghost-2" | "ghost-3" | "ghost-off" | "gif" | "gift" | "gift-card" | "gift-off" | "git-branch" | "git-branch-deleted" | "git-cherry-pick" | "git-commit" | "git-compare" | "git-fork" | "git-merge" | "git-pull-request" | "git-pull-request-closed" | "git-pull-request-conflict" | "git-pull-request-draft" | "gizmo" | "glass" | "glass-champagne" | "glass-cocktail" | "glass-full" | "glass-gin" | "glass-off" | "globe" | "globe-off" | "go-game" | "golf" | "golf-off" | "gps" | "gradienter" | "grain" | "grape" | "graph" | "graph-off" | "grave" | "grave-2" | "grid-3x3" | "grid-4x4" | "grid-dots" | "grid-goldenratio" | "grid-pattern" | "grid-scan" | "grill" | "grill-fork" | "grill-off" | "grill-spatula" | "grip-horizontal" | "grip-vertical" | "growth" | "guitar-pick" | "gymnastics" | "h-1" | "h-2" | "h-3" | "h-4" | "h-5" | "h-6" | "hammer" | "hammer-drill" | "hammer-off" | "hand-click" | "hand-click-off" | "hand-finger" | "hand-finger-down" | "hand-finger-left" | "hand-finger-off" | "hand-finger-right" | "hand-grab" | "hand-little-finger" | "hand-love-you" | "hand-middle-finger" | "hand-move" | "hand-off" | "hand-ring-finger" | "hand-sanitizer" | "hand-stop" | "hand-three-fingers" | "hand-two-fingers" | "hanger" | "hanger-2" | "hanger-off" | "hash" | "haze" | "haze-moon" | "hdr" | "heading" | "heading-off" | "headphones" | "headphones-off" | "headset" | "headset-off" | "health-recognition" | "heart" | "heart-bitcoin" | "heart-bolt" | "heart-broken" | "heart-cancel" | "heart-check" | "heart-code" | "heart-cog" | "heart-discount" | "heart-dollar" | "heart-down" | "heart-exclamation" | "heart-handshake" | "heart-minus" | "heart-off" | "heart-pause" | "heart-pin" | "heart-plus" | "heart-question" | "heart-rate-monitor" | "heart-search" | "heart-share" | "heart-spark" | "heart-star" | "heart-up" | "heart-x" | "heartbeat" | "hearts" | "hearts-off" | "helicopter" | "helicopter-landing" | "helmet" | "helmet-off" | "help" | "help-circle" | "help-hexagon" | "help-octagon" | "help-off" | "help-small" | "help-square" | "help-square-rounded" | "help-triangle" | "hemisphere" | "hemisphere-off" | "hemisphere-plus" | "hexagon" | "hexagon-3d" | "hexagon-asterisk" | "hexagon-letter-a" | "hexagon-letter-b" | "hexagon-letter-c" | "hexagon-letter-d" | "hexagon-letter-e" | "hexagon-letter-f" | "hexagon-letter-g" | "hexagon-letter-h" | "hexagon-letter-i" | "hexagon-letter-j" | "hexagon-letter-k" | "hexagon-letter-l" | "hexagon-letter-m" | "hexagon-letter-n" | "hexagon-letter-o" | "hexagon-letter-p" | "hexagon-letter-q" | "hexagon-letter-r" | "hexagon-letter-s" | "hexagon-letter-t" | "hexagon-letter-u" | "hexagon-letter-v" | "hexagon-letter-w" | "hexagon-letter-x" | "hexagon-letter-y" | "hexagon-letter-z" | "hexagon-minus" | "hexagon-minus-2" | "hexagon-number-0" | "hexagon-number-1" | "hexagon-number-2" | "hexagon-number-3" | "hexagon-number-4" | "hexagon-number-5" | "hexagon-number-6" | "hexagon-number-7" | "hexagon-number-8" | "hexagon-number-9" | "hexagon-off" | "hexagon-plus" | "hexagon-plus-2" | "hexagonal-prism" | "hexagonal-prism-off" | "hexagonal-prism-plus" | "hexagonal-pyramid" | "hexagonal-pyramid-off" | "hexagonal-pyramid-plus" | "hexagons" | "hexagons-off" | "hierarchy" | "hierarchy-2" | "hierarchy-3" | "hierarchy-off" | "highlight" | "highlight-off" | "history" | "history-off" | "history-toggle" | "home" | "home-2" | "home-bitcoin" | "home-bolt" | "home-cancel" | "home-check" | "home-cog" | "home-dollar" | "home-dot" | "home-down" | "home-eco" | "home-edit" | "home-exclamation" | "home-hand" | "home-heart" | "home-infinity" | "home-link" | "home-lock" | "home-minus" | "home-move" | "home-off" | "home-plus" | "home-question" | "home-ribbon" | "home-search" | "home-share" | "home-shield" | "home-signal" | "home-spark" | "home-star" | "home-stats" | "home-up" | "home-x" | "horse" | "horse-toy" | "horseshoe" | "hospital" | "hospital-circle" | "hotel-service" | "hourglass" | "hourglass-empty" | "hourglass-high" | "hourglass-low" | "hourglass-off" | "hours-12" | "hours-24" | "html" | "http-connect" | "http-connect-off" | "http-delete" | "http-delete-off" | "http-get" | "http-get-off" | "http-head" | "http-head-off" | "http-options" | "http-options-off" | "http-patch" | "http-patch-off" | "http-post" | "http-post-off" | "http-put" | "http-put-off" | "http-que" | "http-que-off" | "http-trace" | "http-trace-off" | "hula-hoop" | "ice-cream" | "ice-cream-2" | "ice-cream-off" | "ice-skating" | "iceberg" | "icons" | "icons-off" | "id" | "id-badge" | "id-badge-2" | "id-badge-off" | "id-off" | "ikosaedr" | "image-generation" | "image-in-picture" | "inbox" | "inbox-off" | "indent-decrease" | "indent-increase" | "infinity" | "infinity-2" | "infinity-off" | "info-circle" | "info-hexagon" | "info-octagon" | "info-small" | "info-square" | "info-square-rounded" | "info-triangle" | "inner-shadow-bottom" | "inner-shadow-bottom-left" | "inner-shadow-bottom-right" | "inner-shadow-left" | "inner-shadow-right" | "inner-shadow-top" | "inner-shadow-top-left" | "inner-shadow-top-right" | "input-ai" | "input-check" | "input-search" | "input-spark" | "input-x" | "invoice" | "ironing" | "ironing-1" | "ironing-2" | "ironing-3" | "ironing-off" | "ironing-steam" | "ironing-steam-off" | "irregular-polyhedron" | "irregular-polyhedron-off" | "irregular-polyhedron-plus" | "italic" | "jacket" | "jetpack" | "jetski" | "jewish-star" | "join-bevel" | "join-round" | "join-straight" | "joker" | "jpg" | "json" | "jump-rope" | "karate" | "kayak" | "kerning" | "key" | "key-off" | "keyboard" | "keyboard-hide" | "keyboard-off" | "keyboard-show" | "keyframe" | "keyframe-align-center" | "keyframe-align-horizontal" | "keyframe-align-vertical" | "keyframes" | "label" | "label-important" | "label-off" | "ladder" | "ladder-off" | "ladle" | "lambda" | "lamp" | "lamp-2" | "lamp-off" | "lane" | "language" | "language-hiragana" | "language-katakana" | "language-off" | "lasso" | "lasso-off" | "lasso-polygon" | "laurel-wreath" | "laurel-wreath-1" | "laurel-wreath-2" | "laurel-wreath-3" | "lawn-mower" | "layers-difference" | "layers-intersect" | "layers-intersect-2" | "layers-linked" | "layers-off" | "layers-selected" | "layers-selected-bottom" | "layers-subtract" | "layers-union" | "layout" | "layout-2" | "layout-align-bottom" | "layout-align-center" | "layout-align-left" | "layout-align-middle" | "layout-align-right" | "layout-align-top" | "layout-board" | "layout-board-split" | "layout-bottombar" | "layout-bottombar-collapse" | "layout-bottombar-expand" | "layout-bottombar-inactive" | "layout-cards" | "layout-collage" | "layout-columns" | "layout-dashboard" | "layout-distribute-horizontal" | "layout-distribute-vertical" | "layout-grid" | "layout-grid-add" | "layout-grid-remove" | "layout-kanban" | "layout-list" | "layout-navbar" | "layout-navbar-collapse" | "layout-navbar-expand" | "layout-navbar-inactive" | "layout-off" | "layout-rows" | "layout-sidebar" | "layout-sidebar-inactive" | "layout-sidebar-left-collapse" | "layout-sidebar-left-expand" | "layout-sidebar-right" | "layout-sidebar-right-collapse" | "layout-sidebar-right-expand" | "layout-sidebar-right-inactive" | "leaf" | "leaf-2" | "leaf-maple" | "leaf-off" | "lego" | "lego-off" | "lemon" | "lemon-2" | "letter-a" | "letter-a-small" | "letter-b" | "letter-b-small" | "letter-c" | "letter-c-small" | "letter-case" | "letter-case-lower" | "letter-case-toggle" | "letter-case-upper" | "letter-d" | "letter-d-small" | "letter-e" | "letter-e-small" | "letter-f" | "letter-f-small" | "letter-g" | "letter-g-small" | "letter-h" | "letter-h-small" | "letter-i" | "letter-i-small" | "letter-j" | "letter-j-small" | "letter-k" | "letter-k-small" | "letter-l" | "letter-l-small" | "letter-m" | "letter-m-small" | "letter-n" | "letter-n-small" | "letter-o" | "letter-o-small" | "letter-p" | "letter-p-small" | "letter-q" | "letter-q-small" | "letter-r" | "letter-r-small" | "letter-s" | "letter-s-small" | "letter-spacing" | "letter-t" | "letter-t-small" | "letter-u" | "letter-u-small" | "letter-v" | "letter-v-small" | "letter-w" | "letter-w-small" | "letter-x" | "letter-x-small" | "letter-y" | "letter-y-small" | "letter-z" | "letter-z-small" | "library" | "library-minus" | "library-photo" | "library-plus" | "license" | "license-off" | "lifebuoy" | "lifebuoy-off" | "lighter" | "line" | "line-dashed" | "line-dotted" | "line-height" | "line-scan" | "link" | "link-minus" | "link-off" | "link-plus" | "list" | "list-check" | "list-details" | "list-letters" | "list-numbers" | "list-search" | "list-tree" | "live-photo" | "live-photo-off" | "live-view" | "load-balancer" | "loader" | "loader-2" | "loader-3" | "loader-4" | "loader-quarter" | "location" | "location-bolt" | "location-broken" | "location-cancel" | "location-check" | "location-code" | "location-cog" | "location-discount" | "location-dollar" | "location-down" | "location-exclamation" | "location-heart" | "location-minus" | "location-off" | "location-pause" | "location-pin" | "location-plus" | "location-question" | "location-search" | "location-share" | "location-star" | "location-up" | "location-x" | "lock" | "lock-access" | "lock-access-off" | "lock-bitcoin" | "lock-bolt" | "lock-cancel" | "lock-check" | "lock-code" | "lock-cog" | "lock-dollar" | "lock-down" | "lock-exclamation" | "lock-heart" | "lock-minus" | "lock-off" | "lock-open" | "lock-open-2" | "lock-open-off" | "lock-password" | "lock-pause" | "lock-pin" | "lock-plus" | "lock-question" | "lock-search" | "lock-share" | "lock-square" | "lock-square-rounded" | "lock-star" | "lock-up" | "lock-x" | "logic-and" | "logic-buffer" | "logic-nand" | "logic-nor" | "logic-not" | "logic-or" | "logic-xnor" | "logic-xor" | "login" | "login-2" | "logout" | "logout-2" | "logs" | "lollipop" | "lollipop-off" | "luggage" | "luggage-off" | "lungs" | "lungs-off" | "macro" | "macro-off" | "magnet" | "magnet-off" | "magnetic" | "mail" | "mail-ai" | "mail-bitcoin" | "mail-bolt" | "mail-cancel" | "mail-check" | "mail-code" | "mail-cog" | "mail-dollar" | "mail-down" | "mail-exclamation" | "mail-fast" | "mail-forward" | "mail-heart" | "mail-minus" | "mail-off" | "mail-opened" | "mail-pause" | "mail-pin" | "mail-plus" | "mail-question" | "mail-search" | "mail-share" | "mail-spark" | "mail-star" | "mail-up" | "mail-x" | "mailbox" | "mailbox-off" | "man" | "manual-gearbox" | "map" | "map-2" | "map-bolt" | "map-cancel" | "map-check" | "map-code" | "map-cog" | "map-discount" | "map-dollar" | "map-down" | "map-east" | "map-exclamation" | "map-heart" | "map-lock" | "map-minus" | "map-north" | "map-off" | "map-pause" | "map-pin" | "map-pin-2" | "map-pin-bolt" | "map-pin-cancel" | "map-pin-check" | "map-pin-code" | "map-pin-cog" | "map-pin-dollar" | "map-pin-down" | "map-pin-exclamation" | "map-pin-heart" | "map-pin-minus" | "map-pin-off" | "map-pin-pause" | "map-pin-pin" | "map-pin-plus" | "map-pin-question" | "map-pin-search" | "map-pin-share" | "map-pin-star" | "map-pin-up" | "map-pin-x" | "map-pins" | "map-plus" | "map-question" | "map-route" | "map-search" | "map-share" | "map-shield" | "map-south" | "map-star" | "map-up" | "map-west" | "map-x" | "markdown" | "markdown-off" | "marquee" | "marquee-2" | "marquee-off" | "mars" | "mask" | "mask-off" | "masks-theater" | "masks-theater-off" | "massage" | "matchstick" | "math" | "math-1-divide-2" | "math-1-divide-3" | "math-avg" | "math-cos" | "math-ctg" | "math-equal-greater" | "math-equal-lower" | "math-function" | "math-function-off" | "math-function-y" | "math-greater" | "math-integral" | "math-integral-x" | "math-integrals" | "math-lower" | "math-max" | "math-max-min" | "math-min" | "math-not" | "math-off" | "math-pi" | "math-pi-divide-2" | "math-sec" | "math-sin" | "math-symbols" | "math-tg" | "math-x-divide-2" | "math-x-divide-y" | "math-x-divide-y-2" | "math-x-floor-divide-y" | "math-x-minus-x" | "math-x-minus-y" | "math-x-plus-x" | "math-x-plus-y" | "math-xy" | "math-y-minus-y" | "math-y-plus-y" | "matrix" | "maximize" | "maximize-off" | "meat" | "meat-off" | "medal" | "medal-2" | "medical-cross" | "medical-cross-circle" | "medical-cross-off" | "medicine-syrup" | "meeple" | "melon" | "menorah" | "menu" | "menu-2" | "menu-3" | "menu-4" | "menu-deep" | "menu-order" | "mesh" | "message" | "message-2" | "message-2-bolt" | "message-2-cancel" | "message-2-check" | "message-2-code" | "message-2-cog" | "message-2-dollar" | "message-2-down" | "message-2-exclamation" | "message-2-heart" | "message-2-minus" | "message-2-off" | "message-2-pause" | "message-2-pin" | "message-2-plus" | "message-2-question" | "message-2-search" | "message-2-share" | "message-2-star" | "message-2-up" | "message-2-x" | "message-bolt" | "message-cancel" | "message-chatbot" | "message-check" | "message-circle" | "message-circle-bolt" | "message-circle-cancel" | "message-circle-check" | "message-circle-code" | "message-circle-cog" | "message-circle-dollar" | "message-circle-down" | "message-circle-exclamation" | "message-circle-heart" | "message-circle-minus" | "message-circle-off" | "message-circle-pause" | "message-circle-pin" | "message-circle-plus" | "message-circle-question" | "message-circle-search" | "message-circle-share" | "message-circle-star" | "message-circle-up" | "message-circle-user" | "message-circle-x" | "message-code" | "message-cog" | "message-dollar" | "message-dots" | "message-down" | "message-exclamation" | "message-forward" | "message-heart" | "message-language" | "message-minus" | "message-off" | "message-pause" | "message-pin" | "message-plus" | "message-question" | "message-reply" | "message-report" | "message-search" | "message-share" | "message-star" | "message-up" | "message-user" | "message-x" | "messages" | "messages-off" | "meteor" | "meteor-off" | "meter-cube" | "meter-square" | "metronome" | "michelin-bib-gourmand" | "michelin-star" | "michelin-star-green" | "mickey" | "microfrontends" | "microphone" | "microphone-2" | "microphone-2-off" | "microphone-off" | "microscope" | "microscope-off" | "microwave" | "microwave-off" | "middleware" | "military-award" | "military-rank" | "milk" | "milk-off" | "milkshake" | "minimize" | "minus" | "minus-vertical" | "mist" | "mist-off" | "mobiledata" | "mobiledata-off" | "moneybag" | "moneybag-edit" | "moneybag-heart" | "moneybag-minus" | "moneybag-move" | "moneybag-move-back" | "moneybag-plus" | "monkeybar" | "mood-angry" | "mood-annoyed" | "mood-annoyed-2" | "mood-bitcoin" | "mood-boy" | "mood-check" | "mood-cog" | "mood-confuzed" | "mood-crazy-happy" | "mood-cry" | "mood-dollar" | "mood-edit" | "mood-empty" | "mood-happy" | "mood-heart" | "mood-kid" | "mood-look-down" | "mood-look-left" | "mood-look-right" | "mood-look-up" | "mood-minus" | "mood-nerd" | "mood-nervous" | "mood-neutral" | "mood-off" | "mood-pin" | "mood-plus" | "mood-puzzled" | "mood-sad" | "mood-sad-2" | "mood-sad-dizzy" | "mood-sad-squint" | "mood-search" | "mood-share" | "mood-sick" | "mood-silence" | "mood-sing" | "mood-smile" | "mood-smile-beam" | "mood-smile-dizzy" | "mood-spark" | "mood-surprised" | "mood-tongue" | "mood-tongue-wink" | "mood-tongue-wink-2" | "mood-unamused" | "mood-up" | "mood-wink" | "mood-wink-2" | "mood-wrrr" | "mood-x" | "mood-xd" | "moon" | "moon-2" | "moon-off" | "moon-stars" | "moped" | "mosque" | "motorbike" | "mountain" | "mountain-off" | "mouse" | "mouse-2" | "mouse-off" | "moustache" | "movie" | "movie-off" | "mug" | "mug-off" | "multiplier-0-5x" | "multiplier-1-5x" | "multiplier-1x" | "multiplier-2x" | "mushroom" | "mushroom-off" | "music" | "music-bolt" | "music-cancel" | "music-check" | "music-code" | "music-cog" | "music-discount" | "music-dollar" | "music-down" | "music-exclamation" | "music-heart" | "music-minus" | "music-off" | "music-pause" | "music-pin" | "music-plus" | "music-question" | "music-search" | "music-share" | "music-star" | "music-up" | "music-x" | "navigation" | "navigation-bolt" | "navigation-cancel" | "navigation-check" | "navigation-code" | "navigation-cog" | "navigation-discount" | "navigation-dollar" | "navigation-down" | "navigation-east" | "navigation-exclamation" | "navigation-heart" | "navigation-minus" | "navigation-north" | "navigation-off" | "navigation-pause" | "navigation-pin" | "navigation-plus" | "navigation-question" | "navigation-search" | "navigation-share" | "navigation-south" | "navigation-star" | "navigation-top" | "navigation-up" | "navigation-west" | "navigation-x" | "needle" | "needle-thread" | "network" | "network-off" | "new-section" | "news" | "news-off" | "nfc" | "nfc-off" | "no-copyright" | "no-creative-commons" | "no-derivatives" | "noise-reduction" | "north-star" | "notdef" | "note" | "note-off" | "notebook" | "notebook-off" | "notes" | "notes-off" | "notification" | "notification-off" | "number" | "number-0" | "number-0-small" | "number-1" | "number-1-small" | "number-10" | "number-10-small" | "number-100-small" | "number-11" | "number-11-small" | "number-12-small" | "number-123" | "number-13-small" | "number-14-small" | "number-15-small" | "number-16-small" | "number-17-small" | "number-18-small" | "number-19-small" | "number-2" | "number-2-small" | "number-20-small" | "number-21-small" | "number-22-small" | "number-23-small" | "number-24-small" | "number-25-small" | "number-26-small" | "number-27-small" | "number-28-small" | "number-29-small" | "number-3" | "number-3-small" | "number-30-small" | "number-31-small" | "number-32-small" | "number-33-small" | "number-34-small" | "number-35-small" | "number-36-small" | "number-37-small" | "number-38-small" | "number-39-small" | "number-4" | "number-4-small" | "number-40-small" | "number-41-small" | "number-42-small" | "number-43-small" | "number-44-small" | "number-45-small" | "number-46-small" | "number-47-small" | "number-48-small" | "number-49-small" | "number-5" | "number-5-small" | "number-50-small" | "number-51-small" | "number-52-small" | "number-53-small" | "number-54-small" | "number-55-small" | "number-56-small" | "number-57-small" | "number-58-small" | "number-59-small" | "number-6" | "number-6-small" | "number-60-small" | "number-61-small" | "number-62-small" | "number-63-small" | "number-64-small" | "number-65-small" | "number-66-small" | "number-67-small" | "number-68-small" | "number-69-small" | "number-7" | "number-7-small" | "number-70-small" | "number-71-small" | "number-72-small" | "number-73-small" | "number-74-small" | "number-75-small" | "number-76-small" | "number-77-small" | "number-78-small" | "number-79-small" | "number-8" | "number-8-small" | "number-80-small" | "number-81-small" | "number-82-small" | "number-83-small" | "number-84-small" | "number-85-small" | "number-86-small" | "number-87-small" | "number-88-small" | "number-89-small" | "number-9" | "number-9-small" | "number-90-small" | "number-91-small" | "number-92-small" | "number-93-small" | "number-94-small" | "number-95-small" | "number-96-small" | "number-97-small" | "number-98-small" | "number-99-small" | "numbers" | "nurse" | "nut" | "object-scan" | "octagon" | "octagon-minus" | "octagon-minus-2" | "octagon-off" | "octagon-plus" | "octagon-plus-2" | "octahedron" | "octahedron-off" | "octahedron-plus" | "old" | "olympic-torch" | "olympics" | "olympics-off" | "om" | "omega" | "option" | "outbound" | "outlet" | "oval" | "oval-vertical" | "overline" | "package" | "package-export" | "package-import" | "package-off" | "packages" | "pacman" | "page-break" | "paint" | "paint-off" | "palette" | "palette-off" | "panorama-horizontal" | "panorama-horizontal-off" | "panorama-vertical" | "panorama-vertical-off" | "paper-bag" | "paper-bag-off" | "paperclip" | "parachute" | "parachute-off" | "parentheses" | "parentheses-off" | "parking" | "parking-circle" | "parking-meter" | "parking-off" | "password" | "password-fingerprint" | "password-mobile-phone" | "password-user" | "paw" | "paw-off" | "paywall" | "pdf" | "peace" | "pencil" | "pencil-bolt" | "pencil-cancel" | "pencil-check" | "pencil-code" | "pencil-cog" | "pencil-discount" | "pencil-dollar" | "pencil-down" | "pencil-exclamation" | "pencil-heart" | "pencil-minus" | "pencil-off" | "pencil-pause" | "pencil-pin" | "pencil-plus" | "pencil-question" | "pencil-search" | "pencil-share" | "pencil-star" | "pencil-up" | "pencil-x" | "pendulum" | "pennant" | "pennant-2" | "pennant-off" | "pentagon" | "pentagon-minus" | "pentagon-number-0" | "pentagon-number-1" | "pentagon-number-2" | "pentagon-number-3" | "pentagon-number-4" | "pentagon-number-5" | "pentagon-number-6" | "pentagon-number-7" | "pentagon-number-8" | "pentagon-number-9" | "pentagon-off" | "pentagon-plus" | "pentagon-x" | "pentagram" | "pepper" | "pepper-off" | "percentage" | "percentage-0" | "percentage-10" | "percentage-100" | "percentage-20" | "percentage-25" | "percentage-30" | "percentage-33" | "percentage-40" | "percentage-50" | "percentage-60" | "percentage-66" | "percentage-70" | "percentage-75" | "percentage-80" | "percentage-90" | "perfume" | "perspective" | "perspective-off" | "phone" | "phone-call" | "phone-calling" | "phone-check" | "phone-done" | "phone-end" | "phone-incoming" | "phone-off" | "phone-outgoing" | "phone-pause" | "phone-plus" | "phone-ringing" | "phone-spark" | "phone-x" | "photo" | "photo-ai" | "photo-alt" | "photo-bitcoin" | "photo-bolt" | "photo-cancel" | "photo-check" | "photo-circle" | "photo-circle-minus" | "photo-circle-plus" | "photo-code" | "photo-cog" | "photo-dollar" | "photo-down" | "photo-edit" | "photo-exclamation" | "photo-heart" | "photo-hexagon" | "photo-minus" | "photo-off" | "photo-pause" | "photo-pentagon" | "photo-pin" | "photo-plus" | "photo-question" | "photo-scan" | "photo-search" | "photo-sensor" | "photo-sensor-2" | "photo-sensor-3" | "photo-share" | "photo-shield" | "photo-spark" | "photo-square-rounded" | "photo-star" | "photo-up" | "photo-video" | "photo-x" | "physotherapist" | "piano" | "pick" | "picnic-table" | "picture-in-picture" | "picture-in-picture-off" | "picture-in-picture-on" | "picture-in-picture-top" | "pig" | "pig-money" | "pig-off" | "pilcrow" | "pilcrow-left" | "pilcrow-right" | "pill" | "pill-off" | "pillow" | "pills" | "pin" | "pin-end" | "pin-invoke" | "ping-pong" | "pinned" | "pinned-off" | "pipeline" | "pizza" | "pizza-off" | "placeholder" | "plane" | "plane-arrival" | "plane-departure" | "plane-inflight" | "plane-off" | "plane-tilt" | "planet" | "planet-off" | "plant" | "plant-2" | "plant-2-off" | "plant-off" | "play-basketball" | "play-card" | "play-card-1" | "play-card-10" | "play-card-2" | "play-card-3" | "play-card-4" | "play-card-5" | "play-card-6" | "play-card-7" | "play-card-8" | "play-card-9" | "play-card-a" | "play-card-j" | "play-card-k" | "play-card-off" | "play-card-q" | "play-card-star" | "play-football" | "play-handball" | "play-volleyball" | "player-eject" | "player-pause" | "player-play" | "player-record" | "player-skip-back" | "player-skip-forward" | "player-stop" | "player-track-next" | "player-track-prev" | "playlist" | "playlist-add" | "playlist-off" | "playlist-x" | "playstation-circle" | "playstation-square" | "playstation-triangle" | "playstation-x" | "plug" | "plug-connected" | "plug-connected-x" | "plug-off" | "plug-x" | "plunger" | "plus" | "plus-equal" | "plus-minus" | "png" | "podium" | "podium-off" | "point" | "point-off" | "pointer" | "pointer-2" | "pointer-bolt" | "pointer-cancel" | "pointer-check" | "pointer-code" | "pointer-cog" | "pointer-collaboration" | "pointer-collaboration-2" | "pointer-dollar" | "pointer-down" | "pointer-exclamation" | "pointer-heart" | "pointer-minus" | "pointer-off" | "pointer-pause" | "pointer-pin" | "pointer-plus" | "pointer-question" | "pointer-search" | "pointer-share" | "pointer-star" | "pointer-up" | "pointer-x" | "pokeball" | "pokeball-off" | "poker-chip" | "polaroid" | "polygon" | "polygon-off" | "poo" | "pool" | "pool-off" | "power" | "pray" | "premium-rights" | "prescription" | "presentation" | "presentation-analytics" | "presentation-off" | "printer" | "printer-off" | "prism" | "prism-light" | "prism-off" | "prism-plus" | "prison" | "progress" | "progress-alert" | "progress-bolt" | "progress-check" | "progress-down" | "progress-help" | "progress-x" | "prompt" | "prong" | "propeller" | "propeller-off" | "protocol" | "pumpkin-scary" | "puzzle" | "puzzle-2" | "puzzle-off" | "pyramid" | "pyramid-off" | "pyramid-plus" | "qrcode" | "qrcode-off" | "question-mark" | "queue-pop-in" | "queue-pop-out" | "quote" | "quote-off" | "quote-open" | "quotes" | "radar" | "radar-2" | "radar-off" | "radio" | "radio-off" | "radioactive" | "radioactive-off" | "radius-bottom-left" | "radius-bottom-right" | "radius-top-left" | "radius-top-right" | "rainbow" | "rainbow-off" | "rating-12-plus" | "rating-14-plus" | "rating-16-plus" | "rating-18-plus" | "rating-21-plus" | "razor" | "razor-electric" | "receipt" | "receipt-2" | "receipt-bitcoin" | "receipt-dollar" | "receipt-euro" | "receipt-off" | "receipt-pound" | "receipt-refund" | "receipt-rupee" | "receipt-tax" | "receipt-yen" | "receipt-yuan" | "recharging" | "record-mail" | "record-mail-off" | "rectangle" | "rectangle-rounded-bottom" | "rectangle-rounded-top" | "rectangle-vertical" | "rectangular-prism" | "rectangular-prism-off" | "rectangular-prism-plus" | "recycle" | "recycle-off" | "refresh" | "refresh-alert" | "refresh-dot" | "refresh-off" | "regex" | "regex-off" | "registered" | "relation-many-to-many" | "relation-one-to-many" | "relation-one-to-one" | "reload" | "reorder" | "repeat" | "repeat-off" | "repeat-once" | "replace" | "replace-off" | "replace-user" | "report" | "report-analytics" | "report-medical" | "report-money" | "report-off" | "report-search" | "reserved-line" | "resize" | "restore" | "rewind-backward-10" | "rewind-backward-15" | "rewind-backward-20" | "rewind-backward-30" | "rewind-backward-40" | "rewind-backward-5" | "rewind-backward-50" | "rewind-backward-60" | "rewind-forward-10" | "rewind-forward-15" | "rewind-forward-20" | "rewind-forward-30" | "rewind-forward-40" | "rewind-forward-5" | "rewind-forward-50" | "rewind-forward-60" | "ribbon-health" | "rings" | "ripple" | "ripple-down" | "ripple-off" | "ripple-up" | "road" | "road-off" | "road-sign" | "robot" | "robot-face" | "robot-off" | "rocket" | "rocket-off" | "roller-skating" | "rollercoaster" | "rollercoaster-off" | "rosette" | "rosette-asterisk" | "rosette-discount" | "rosette-discount-check" | "rosette-discount-check-off" | "rosette-discount-off" | "rosette-number-0" | "rosette-number-1" | "rosette-number-2" | "rosette-number-3" | "rosette-number-4" | "rosette-number-5" | "rosette-number-6" | "rosette-number-7" | "rosette-number-8" | "rosette-number-9" | "rotate" | "rotate-2" | "rotate-360" | "rotate-3d" | "rotate-clockwise" | "rotate-clockwise-2" | "rotate-dot" | "rotate-rectangle" | "roulette" | "route" | "route-2" | "route-alt-left" | "route-alt-right" | "route-off" | "route-scan" | "route-square" | "route-square-2" | "route-x" | "route-x-2" | "router" | "router-off" | "row-insert-bottom" | "row-insert-top" | "row-remove" | "rss" | "rubber-stamp" | "rubber-stamp-off" | "rugby" | "ruler" | "ruler-2" | "ruler-2-off" | "ruler-3" | "ruler-measure" | "ruler-measure-2" | "ruler-off" | "run" | "rv-truck" | "s-turn-down" | "s-turn-left" | "s-turn-right" | "s-turn-up" | "sailboat" | "sailboat-2" | "sailboat-off" | "salad" | "salt" | "sandbox" | "satellite" | "satellite-off" | "sausage" | "scale" | "scale-off" | "scale-outline" | "scale-outline-off" | "scan" | "scan-cube" | "scan-eye" | "scan-letter-a" | "scan-letter-t" | "scan-position" | "scan-traces" | "schema" | "schema-off" | "school" | "school-bell" | "school-off" | "scissors" | "scissors-off" | "scooter" | "scooter-electric" | "scoreboard" | "screen-share" | "screen-share-off" | "screenshot" | "scribble" | "scribble-off" | "script" | "script-minus" | "script-plus" | "script-x" | "scuba-diving" | "scuba-diving-tank" | "scuba-mask" | "scuba-mask-off" | "sdk" | "search" | "search-off" | "section" | "section-sign" | "seedling" | "seedling-off" | "segway" | "select" | "select-all" | "selector" | "send" | "send-2" | "send-off" | "seo" | "separator" | "separator-horizontal" | "separator-vertical" | "server" | "server-2" | "server-bolt" | "server-cog" | "server-off" | "server-spark" | "serverless" | "servicemark" | "settings" | "settings-2" | "settings-ai" | "settings-automation" | "settings-bolt" | "settings-cancel" | "settings-check" | "settings-code" | "settings-cog" | "settings-dollar" | "settings-down" | "settings-exclamation" | "settings-heart" | "settings-minus" | "settings-off" | "settings-pause" | "settings-pin" | "settings-plus" | "settings-question" | "settings-search" | "settings-share" | "settings-spark" | "settings-star" | "settings-up" | "settings-x" | "shadow" | "shadow-off" | "shape" | "shape-2" | "shape-3" | "shape-off" | "share" | "share-2" | "share-3" | "share-off" | "shareplay" | "shield" | "shield-bolt" | "shield-cancel" | "shield-check" | "shield-checkered" | "shield-chevron" | "shield-code" | "shield-cog" | "shield-dollar" | "shield-down" | "shield-exclamation" | "shield-half" | "shield-heart" | "shield-lock" | "shield-minus" | "shield-off" | "shield-pause" | "shield-pin" | "shield-plus" | "shield-question" | "shield-search" | "shield-share" | "shield-star" | "shield-up" | "shield-x" | "ship" | "ship-off" | "shirt" | "shirt-off" | "shirt-sport" | "shoe" | "shoe-off" | "shopping-bag" | "shopping-bag-check" | "shopping-bag-discount" | "shopping-bag-edit" | "shopping-bag-exclamation" | "shopping-bag-heart" | "shopping-bag-minus" | "shopping-bag-plus" | "shopping-bag-search" | "shopping-bag-x" | "shopping-cart" | "shopping-cart-bolt" | "shopping-cart-cancel" | "shopping-cart-check" | "shopping-cart-code" | "shopping-cart-cog" | "shopping-cart-copy" | "shopping-cart-discount" | "shopping-cart-dollar" | "shopping-cart-down" | "shopping-cart-exclamation" | "shopping-cart-heart" | "shopping-cart-minus" | "shopping-cart-off" | "shopping-cart-pause" | "shopping-cart-pin" | "shopping-cart-plus" | "shopping-cart-question" | "shopping-cart-search" | "shopping-cart-share" | "shopping-cart-star" | "shopping-cart-up" | "shopping-cart-x" | "shovel" | "shovel-pitchforks" | "shredder" | "sign-left" | "sign-right" | "signal-2g" | "signal-3g" | "signal-4g" | "signal-4g-plus" | "signal-5g" | "signal-6g" | "signal-e" | "signal-g" | "signal-h" | "signal-h-plus" | "signal-lte" | "signature" | "signature-off" | "sitemap" | "sitemap-off" | "skateboard" | "skateboard-off" | "skateboarding" | "sketching" | "skew-x" | "skew-y" | "ski-jumping" | "skull" | "slash" | "slashes" | "sleigh" | "slice" | "slideshow" | "smart-home" | "smart-home-off" | "smoking" | "smoking-no" | "snowboarding" | "snowflake" | "snowflake-off" | "snowman" | "soccer-field" | "social" | "social-off" | "sock" | "sofa" | "sofa-off" | "solar-electricity" | "solar-panel" | "solar-panel-2" | "sort-0-9" | "sort-9-0" | "sort-a-z" | "sort-ascending" | "sort-ascending-2" | "sort-ascending-letters" | "sort-ascending-numbers" | "sort-ascending-shapes" | "sort-ascending-small-big" | "sort-descending" | "sort-descending-2" | "sort-descending-letters" | "sort-descending-numbers" | "sort-descending-shapes" | "sort-descending-small-big" | "sort-z-a" | "sos" | "soup" | "soup-off" | "source-code" | "space" | "space-off" | "spaces" | "spacing-horizontal" | "spacing-vertical" | "spade" | "sparkle" | "sparkle-2" | "sparkle-highlight" | "sparkles" | "sparkles-2" | "speakerphone" | "speedboat" | "sphere" | "sphere-2" | "sphere-off" | "sphere-plus" | "spider" | "spiral" | "spiral-off" | "sport-billard" | "spray" | "spy" | "spy-off" | "sql" | "square" | "square-arrow-down" | "square-arrow-left" | "square-arrow-right" | "square-arrow-up" | "square-asterisk" | "square-check" | "square-chevron-down" | "square-chevron-left" | "square-chevron-right" | "square-chevron-up" | "square-chevrons-down" | "square-chevrons-left" | "square-chevrons-right" | "square-chevrons-up" | "square-dashed" | "square-dot" | "square-f0" | "square-f1" | "square-f2" | "square-f3" | "square-f4" | "square-f5" | "square-f6" | "square-f7" | "square-f8" | "square-f9" | "square-forbid" | "square-forbid-2" | "square-half" | "square-key" | "square-letter-a" | "square-letter-b" | "square-letter-c" | "square-letter-d" | "square-letter-e" | "square-letter-f" | "square-letter-g" | "square-letter-h" | "square-letter-i" | "square-letter-j" | "square-letter-k" | "square-letter-l" | "square-letter-m" | "square-letter-n" | "square-letter-o" | "square-letter-p" | "square-letter-q" | "square-letter-r" | "square-letter-s" | "square-letter-t" | "square-letter-u" | "square-letter-v" | "square-letter-w" | "square-letter-x" | "square-letter-y" | "square-letter-z" | "square-minus" | "square-minus-2" | "square-number-0" | "square-number-1" | "square-number-2" | "square-number-3" | "square-number-4" | "square-number-5" | "square-number-6" | "square-number-7" | "square-number-8" | "square-number-9" | "square-off" | "square-percentage" | "square-plus" | "square-plus-2" | "square-root" | "square-root-2" | "square-rotated" | "square-rotated-asterisk" | "square-rotated-forbid" | "square-rotated-forbid-2" | "square-rotated-off" | "square-rounded" | "square-rounded-arrow-down" | "square-rounded-arrow-left" | "square-rounded-arrow-right" | "square-rounded-arrow-up" | "square-rounded-check" | "square-rounded-chevron-down" | "square-rounded-chevron-left" | "square-rounded-chevron-right" | "square-rounded-chevron-up" | "square-rounded-chevrons-down" | "square-rounded-chevrons-left" | "square-rounded-chevrons-right" | "square-rounded-chevrons-up" | "square-rounded-letter-a" | "square-rounded-letter-b" | "square-rounded-letter-c" | "square-rounded-letter-d" | "square-rounded-letter-e" | "square-rounded-letter-f" | "square-rounded-letter-g" | "square-rounded-letter-h" | "square-rounded-letter-i" | "square-rounded-letter-j" | "square-rounded-letter-k" | "square-rounded-letter-l" | "square-rounded-letter-m" | "square-rounded-letter-n" | "square-rounded-letter-o" | "square-rounded-letter-p" | "square-rounded-letter-q" | "square-rounded-letter-r" | "square-rounded-letter-s" | "square-rounded-letter-t" | "square-rounded-letter-u" | "square-rounded-letter-v" | "square-rounded-letter-w" | "square-rounded-letter-x" | "square-rounded-letter-y" | "square-rounded-letter-z" | "square-rounded-minus" | "square-rounded-minus-2" | "square-rounded-number-0" | "square-rounded-number-1" | "square-rounded-number-2" | "square-rounded-number-3" | "square-rounded-number-4" | "square-rounded-number-5" | "square-rounded-number-6" | "square-rounded-number-7" | "square-rounded-number-8" | "square-rounded-number-9" | "square-rounded-percentage" | "square-rounded-plus" | "square-rounded-plus-2" | "square-rounded-x" | "square-toggle" | "square-toggle-horizontal" | "square-x" | "squares" | "squares-diagonal" | "squares-selected" | "stack" | "stack-2" | "stack-3" | "stack-back" | "stack-backward" | "stack-forward" | "stack-front" | "stack-middle" | "stack-pop" | "stack-push" | "stairs" | "stairs-down" | "stairs-up" | "star" | "star-half" | "star-off" | "stars" | "stars-off" | "status-change" | "steam" | "steering-wheel" | "steering-wheel-off" | "step-into" | "step-out" | "stereo-glasses" | "stethoscope" | "stethoscope-off" | "sticker" | "sticker-2" | "stopwatch" | "storm" | "storm-off" | "stretching" | "stretching-2" | "strikethrough" | "stroke-curved" | "stroke-dynamic" | "stroke-straight" | "submarine" | "subscript" | "subtask" | "subtitles" | "subtitles-ai" | "subtitles-edit" | "subtitles-off" | "sum" | "sum-off" | "sun" | "sun-electricity" | "sun-high" | "sun-low" | "sun-moon" | "sun-off" | "sun-wind" | "sunglasses" | "sunrise" | "sunset" | "sunset-2" | "superscript" | "svg" | "swimming" | "swipe" | "swipe-down" | "swipe-left" | "swipe-right" | "swipe-up" | "switch" | "switch-2" | "switch-3" | "switch-horizontal" | "switch-vertical" | "sword" | "sword-off" | "swords" | "table" | "table-alias" | "table-column" | "table-dashed" | "table-down" | "table-export" | "table-heart" | "table-import" | "table-minus" | "table-off" | "table-options" | "table-plus" | "table-row" | "table-share" | "table-shortcut" | "table-spark" | "tag" | "tag-minus" | "tag-off" | "tag-plus" | "tag-starred" | "tags" | "tags-off" | "taiwan-dollar" | "tallymark-1" | "tallymark-2" | "tallymark-3" | "tallymark-4" | "tallymarks" | "tank" | "target" | "target-2" | "target-arrow" | "target-off" | "tax" | "tax-euro" | "tax-pound" | "teapot" | "telescope" | "telescope-off" | "temperature" | "temperature-celsius" | "temperature-fahrenheit" | "temperature-minus" | "temperature-off" | "temperature-plus" | "temperature-snow" | "temperature-sun" | "template" | "template-off" | "tent" | "tent-off" | "terminal" | "terminal-2" | "test-pipe" | "test-pipe-2" | "test-pipe-off" | "tex" | "text-caption" | "text-color" | "text-decrease" | "text-direction-ltr" | "text-direction-rtl" | "text-grammar" | "text-increase" | "text-orientation" | "text-plus" | "text-recognition" | "text-resize" | "text-scan-2" | "text-scan-ai" | "text-size" | "text-spellcheck" | "text-wrap" | "text-wrap-column" | "text-wrap-disabled" | "texture" | "theater" | "thermometer" | "thumb-down" | "thumb-down-off" | "thumb-up" | "thumb-up-off" | "tic-tac" | "ticket" | "ticket-off" | "tie" | "tilde" | "tilt-shift" | "tilt-shift-off" | "time-duration-0" | "time-duration-10" | "time-duration-15" | "time-duration-30" | "time-duration-45" | "time-duration-5" | "time-duration-60" | "time-duration-90" | "time-duration-off" | "timeline" | "timeline-event" | "timeline-event-exclamation" | "timeline-event-minus" | "timeline-event-plus" | "timeline-event-text" | "timeline-event-x" | "timezone" | "tip-jar" | "tip-jar-euro" | "tip-jar-pound" | "tir" | "toggle-left" | "toggle-right" | "toilet-paper" | "toilet-paper-off" | "toml" | "tool" | "tools" | "tools-kitchen" | "tools-kitchen-2" | "tools-kitchen-2-off" | "tools-kitchen-3" | "tools-kitchen-off" | "tools-off" | "tooltip" | "topology-bus" | "topology-complex" | "topology-full" | "topology-full-hierarchy" | "topology-ring" | "topology-ring-2" | "topology-ring-3" | "topology-star" | "topology-star-2" | "topology-star-3" | "topology-star-ring" | "topology-star-ring-2" | "topology-star-ring-3" | "torii" | "tornado" | "tournament" | "tower" | "tower-off" | "track" | "tractor" | "trademark" | "traffic-cone" | "traffic-cone-off" | "traffic-lights" | "traffic-lights-off" | "train" | "transaction-bitcoin" | "transaction-dollar" | "transaction-euro" | "transaction-pound" | "transaction-rupee" | "transaction-yen" | "transaction-yuan" | "transfer" | "transfer-in" | "transfer-out" | "transfer-vertical" | "transform" | "transform-point" | "transform-point-bottom-left" | "transform-point-bottom-right" | "transform-point-top-left" | "transform-point-top-right" | "transition-bottom" | "transition-left" | "transition-right" | "transition-top" | "trash" | "trash-off" | "trash-x" | "treadmill" | "tree" | "trees" | "trekking" | "trending-down" | "trending-down-2" | "trending-down-3" | "trending-up" | "trending-up-2" | "trending-up-3" | "trending-up-down" | "triangle" | "triangle-inverted" | "triangle-minus" | "triangle-minus-2" | "triangle-off" | "triangle-plus" | "triangle-plus-2" | "triangle-square-circle" | "triangles" | "trident" | "trolley" | "trophy" | "trophy-off" | "trowel" | "truck" | "truck-delivery" | "truck-loading" | "truck-off" | "truck-return" | "txt" | "typeface" | "typography" | "typography-off" | "u-turn-left" | "u-turn-right" | "ufo" | "ufo-off" | "uhd" | "umbrella" | "umbrella-2" | "umbrella-closed" | "umbrella-closed-2" | "umbrella-off" | "underline" | "unicycle" | "universe" | "unlink" | "upload" | "urgent" | "usb" | "user" | "user-bitcoin" | "user-bolt" | "user-cancel" | "user-check" | "user-circle" | "user-code" | "user-cog" | "user-dollar" | "user-down" | "user-edit" | "user-exclamation" | "user-heart" | "user-hexagon" | "user-key" | "user-minus" | "user-off" | "user-pause" | "user-pentagon" | "user-pin" | "user-plus" | "user-question" | "user-scan" | "user-screen" | "user-search" | "user-share" | "user-shield" | "user-square" | "user-square-rounded" | "user-star" | "user-up" | "user-x" | "users" | "users-group" | "users-minus" | "users-plus" | "uv-index" | "ux-circle" | "vaccine" | "vaccine-bottle" | "vaccine-bottle-off" | "vaccine-off" | "vacuum-cleaner" | "variable" | "variable-minus" | "variable-off" | "variable-plus" | "vector" | "vector-bezier" | "vector-bezier-2" | "vector-bezier-arc" | "vector-bezier-circle" | "vector-off" | "vector-spline" | "vector-triangle" | "vector-triangle-off" | "venus" | "versions" | "versions-off" | "video" | "video-minus" | "video-off" | "video-plus" | "view-360" | "view-360-arrow" | "view-360-number" | "view-360-off" | "viewfinder" | "viewfinder-off" | "viewport-narrow" | "viewport-short" | "viewport-tall" | "viewport-wide" | "vignette" | "vinyl" | "vip" | "vip-2" | "vip-off" | "virus" | "virus-off" | "virus-search" | "vocabulary" | "vocabulary-off" | "volcano" | "volume" | "volume-2" | "volume-3" | "volume-4" | "volume-off" | "vs" | "walk" | "wall" | "wall-off" | "wallet" | "wallet-off" | "wallpaper" | "wallpaper-off" | "wand" | "wand-off" | "wash" | "wash-dry" | "wash-dry-1" | "wash-dry-2" | "wash-dry-3" | "wash-dry-a" | "wash-dry-dip" | "wash-dry-f" | "wash-dry-flat" | "wash-dry-hang" | "wash-dry-off" | "wash-dry-p" | "wash-dry-shade" | "wash-dry-w" | "wash-dryclean" | "wash-dryclean-off" | "wash-eco" | "wash-gentle" | "wash-hand" | "wash-machine" | "wash-off" | "wash-press" | "wash-temperature-1" | "wash-temperature-2" | "wash-temperature-3" | "wash-temperature-4" | "wash-temperature-5" | "wash-temperature-6" | "wash-tumble-dry" | "wash-tumble-off" | "waterpolo" | "wave-saw-tool" | "wave-sine" | "wave-square" | "waves-electricity" | "webhook" | "webhook-off" | "weight" | "wheat" | "wheat-off" | "wheel" | "wheelchair" | "wheelchair-off" | "whirl" | "whisk" | "wifi" | "wifi-0" | "wifi-1" | "wifi-2" | "wifi-off" | "wind" | "wind-electricity" | "wind-off" | "windmill" | "windmill-off" | "window" | "window-maximize" | "window-minimize" | "window-off" | "windsock" | "wiper" | "wiper-wash" | "woman" | "wood" | "world" | "world-bolt" | "world-cancel" | "world-check" | "world-code" | "world-cog" | "world-dollar" | "world-down" | "world-download" | "world-exclamation" | "world-heart" | "world-latitude" | "world-longitude" | "world-map" | "world-minus" | "world-off" | "world-pause" | "world-pin" | "world-plus" | "world-question" | "world-search" | "world-share" | "world-star" | "world-up" | "world-upload" | "world-www" | "world-x" | "wrecking-ball" | "writing" | "writing-off" | "writing-sign" | "writing-sign-off" | "x" | "x-mark" | "x-power-y" | "xbox-a" | "xbox-b" | "xbox-x" | "xbox-y" | "xd" | "xxx" | "yin-yang" | "yoga" | "zeppelin" | "zeppelin-off" | "zero-config" | "zip" | "zodiac-aquarius" | "zodiac-aries" | "zodiac-cancer" | "zodiac-capricorn" | "zodiac-gemini" | "zodiac-leo" | "zodiac-libra" | "zodiac-pisces" | "zodiac-sagittarius" | "zodiac-scorpio" | "zodiac-taurus" | "zodiac-virgo" | "zoom" | "zoom-cancel" | "zoom-check" | "zoom-code" | "zoom-exclamation" | "zoom-in" | "zoom-in-area" | "zoom-money" | "zoom-out" | "zoom-out-area" | "zoom-pan" | "zoom-question" | "zoom-replace" | "zoom-reset" | "zoom-scan" | "zzz" | "zzz-off";

/** Add outline icons to the registry (e.g. the full set, or your own). */
declare function registerIcons(icons: Record<string, string>): void;
/**
 * Curated names — bundled by default and surfaced for autocomplete. Any other
 * Tabler name works once registered; `CuboIconName` accepts arbitrary strings.
 */
declare const KNOWN_ICON_NAMES: readonly ["check", "x", "plus", "minus", "dots", "dots-vertical", "chevron-up", "chevron-down", "chevron-left", "chevron-right", "chevrons-left", "chevrons-right", "arrow-up", "arrow-down", "arrow-left", "arrow-right", "search", "filter", "menu-2", "refresh", "settings", "adjustments", "user", "users", "lock", "mail", "calendar", "clock", "bell", "eye", "eye-off", "heart", "star", "bookmark", "home", "trash", "edit", "pencil", "copy", "download", "upload", "external-link", "link", "alert-triangle", "alert-circle", "circle-check", "info-circle", "help-circle", "sun", "moon", "world", "file", "folder", "photo", "send", "logout", "grip-vertical", "selector", "device-floppy", "columns-3", "layout-list", "layout-grid", "layout-columns", "filter-off", "database-off", "bell-off", "checks", "message-circle", "paperclip"];
/** The curated names — bundled by default and surfaced on most icon props. */
type IconName = (typeof KNOWN_ICON_NAMES)[number];

/**
 * Curated-autocomplete icon name that still accepts any string. Used by the
 * many secondary "pick an icon" props (button/alert/switch/…). Deliberately NOT
 * the full 5000-name union: that union, intersected with a component's other
 * union-typed props (CuboSlot/VNodeChild) inside Vue's construct-signature
 * overlay, overflows TypeScript's union-representation limit (TS2590).
 */
type IconNameOrString = IconName | (string & {});
/**
 * FULL-autocomplete icon name (every Tabler name) that still accepts any string.
 * Reserved for the dedicated `<CuboIcon icon>` prop, whose props don't combine
 * with other large unions, so the giant union is safe to represent there.
 */
type AllIconNameOrString = AllIconName | (string & {});
/** Alias used by component props (icon names). */
type CuboIconName = IconNameOrString;
/** The default (curated) icon names. For the full list, see `ALL_ICON_NAMES`
 *  from the optional icons entry (`@cuboapp/ui-react/icons`). */
declare const ICON_NAMES: string[];
/** Is `name` currently registered (in the outline registry, or filled if `filled`)? */
declare function hasIcon(name: string, filled?: boolean): boolean;
/**
 * Resolve an icon's inner SVG markup, or `null` if it isn't registered.
 * With `filled`, prefers the filled variant; falls back to the outline markup
 * when no filled variant exists (so `filled` never blanks a valid icon).
 * Components warn (in dev) and render nothing for unknown names.
 */
declare function getIconMarkup(name: string, filled?: boolean): string | null;

interface CuboLanguageInfo {
    /** BCP-47-ish short code used as the value (also the Intl locale base). */
    abbr: string;
    /** Human-readable, endonym name shown in pickers. */
    name: string;
}
/** Languages the kit ships translations for. `abbr` is the value, `name` the label. */
declare const CUBO_LANGUAGES: readonly [{
    readonly abbr: "en";
    readonly name: "English";
}, {
    readonly abbr: "ru";
    readonly name: "Русский";
}];
/** A supported language code (`'en' | 'ru'`). */
type CuboLanguage = (typeof CUBO_LANGUAGES)[number]['abbr'];
/** The default language when none is set on a component or via `<CuboConfig>`. */
declare const CUBO_DEFAULT_LANGUAGE: CuboLanguage;
/** Map a kit language to the BCP-47 locale to hand to `Intl` (dates, etc.). */
declare const CUBO_INTL_LOCALE: Record<CuboLanguage, string>;
/** Narrow an arbitrary value to a supported language, falling back to the default. */
declare function cuboResolveLanguage(language?: string | null): CuboLanguage;
/** Read a dotted path (`'a.b.c'`) out of a nested object; `undefined` if absent. */
declare function cuboGet(obj: unknown, path: string): unknown;
type CuboI18nLocaleTree<L extends string = string> = Record<L, Record<string, unknown>>;
interface CuboI18nOptions<T> {
    /** The initial active locale. */
    locale: keyof T;
    /** Locale consulted when a key is missing in the active one. Defaults to `locale`. */
    fallbackLocale?: keyof T;
    /** `{ [locale]: nestedStrings }`. */
    translations: T;
}
type CuboPathValue<T, P extends string> = P extends `${infer K}.${infer Rest}` ? K extends keyof T ? CuboPathValue<T[K], Rest> : never : P extends keyof T ? T[P] : never;
type CuboDotify<T> = T extends object ? {
    [K in keyof T & string]: T[K] extends (...args: never[]) => unknown ? K : T[K] extends object ? `${K}.${CuboDotify<T[K]>}` : K;
}[keyof T & string] : never;
type CuboDotifyObjectPaths<T> = T extends object ? {
    [K in keyof T & string]: T[K] extends (...args: never[]) => unknown ? never : T[K] extends object ? `${K}` | `${K}.${CuboDotifyObjectPaths<T[K]>}` : never;
}[keyof T & string] : never;
type CuboI18nT<T extends CuboI18nLocaleTree> = <Key extends CuboDotify<T[keyof T]>>(key: Key, replacements?: Record<string, string | number>, def?: string) => string;
/** A typed translator over a `{ locale: tree }` map. */
declare class CuboI18n<T extends CuboI18nLocaleTree> {
    private locale;
    private fallbackLocale;
    private translations;
    private listeners;
    constructor(options: CuboI18nOptions<T>);
    t: CuboI18nT<T>;
    /** A translator bound to a sub-tree, so keys are relative to `base`. */
    tBase<Base extends CuboDotifyObjectPaths<T[keyof T]> | ''>(base?: Base): <Key extends CuboDotify<Base extends "" ? T[keyof T] : CuboPathValue<T[keyof T], Base>>>(key: Key, replacements?: Record<string, string | number>, def?: string) => string;
    setLocale: (locale: keyof T) => void;
    getLocale: () => keyof T;
    /** Subscribe to locale changes; returns an unsubscribe fn. */
    subscribe: (fn: (locale: keyof T) => void) => (() => void);
}
declare function createCuboI18n<T extends CuboI18nLocaleTree>(options: CuboI18nOptions<T>): CuboI18n<T>;
/** Best-effort browser language detection, narrowed to `supportedLocales`. */
declare function detectBrowserLanguage<L extends string>(supportedLocales: readonly L[], fallback: L): L;

/** Default CDN base URL per location/language for remotely-served icon SVGs. */
declare const CUBO_ICON_BASE_URL: Record<CuboLanguage, string>;
/** The CDN folder an icon file lives in. */
type CuboIconFolder = 'curated' | 'curated-filled' | 'generated' | 'generated-filled';
/**
 * Resolve the icon CDN base URL for a location/language. `ru → cuboapp.ru`,
 * `en → cubo.sh`; unknown languages fall back to the default (`en`).
 */
declare function cuboIconBaseUrl(language?: CuboLanguage): string;
/** Build the file URL for an icon: `<base>/icons/<folder>/<name>.svg`. */
declare function cuboIconUrl(baseUrl: string, folder: CuboIconFolder, name: string): string;
/** Strip a standalone `.svg` file down to its inner markup (the `<path>`s). */
declare function cuboExtractSvgInner(svg: string): string;
/**
 * Fetch an icon `.svg` file (cached), resolving to its inner markup, or `null`
 * when it can't be loaded. Safe to call in non-`fetch` environments (resolves
 * `null`). The same URL is only ever fetched once per session.
 */
declare function loadCuboIconFile(url: string): Promise<string | null>;
/** Drop a cached icon (or the whole cache) — mainly for tests. */
declare function clearCuboIconCache(url?: string): void;
/** A resolved remote icon: inner markup (or null) + whether it's the filled file. */
interface CuboRemoteIcon {
    inner: string | null;
    filled: boolean;
}
/**
 * Load a non-curated icon from the CDN. With `filled`, tries the filled folder
 * first and falls back to the outline file when no filled variant exists (so
 * `filled` never blanks a valid icon). Results are cached per URL.
 */
declare function loadCuboGeneratedIcon(baseUrl: string, name: string, filled?: boolean): Promise<CuboRemoteIcon>;

/** Named colours that map to design tokens. */
type CuboColorName = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
/**
 * A colour prop value: a named colour (autocompletes) or any custom CSS colour
 * string (hex, rgb, var(), …). The `(string & {})` keeps the literal suggestions
 * while still allowing arbitrary strings.
 */
type CuboColor = CuboColorName | (string & {});
declare const CUBO_COLORS: readonly ["primary", "neutral", "success", "warning", "danger"];
/**
 * Resolve a {@link CuboColor} to a CSS colour value: a named colour becomes its
 * design-token `var(--c-…)`, anything else passes through untouched. The result
 * is fed to a `--cubo-*-color` custom property the component SCSS builds on.
 */
declare function resolveColor(color: CuboColor | undefined): string | undefined;

/** Global Cubo defaults — the prop subset of `<CuboConfig>` (no children). */
interface CuboGlobalConfig {
    /** Built-in-string language for every component (unless overridden). */
    language?: CuboLanguage;
    /** Base URL for CDN-served icons (overrides the per-language default). */
    iconBaseUrl?: string;
    /**
     * Default surface background for the input + surface components (CuboText,
     * CuboSelect, CuboCheckbox, CuboTable, CuboDrawer, CuboModal) — any CSS colour
     * or `var(--…)`. Applied as the `--cubo-config-bg` custom property on each
     * component root; falls back to `var(--c-color-bg)` when unset. Disabled/
     * readonly states keep their own (muted) fill regardless.
     */
    background?: string;
}
/**
 * Set Cubo config GLOBALLY, without a `<CuboConfig>` provider — e.g. once at app
 * start: `cuboSetConfig({ language: 'ru' })`. MERGES with the existing global
 * config (pass only the fields you want to change). Live: mounted components
 * re-render. A wrapping `<CuboConfig>` or an explicit component prop still wins.
 */
declare function cuboSetConfig(config: CuboGlobalConfig): void;
/** The current global Cubo config (stable reference until `cuboSetConfig` runs). */
declare function cuboGetConfig(): CuboGlobalConfig;

/** Control height scale — maps to `--c-size-component-*` tokens. */
type CuboSize = 'small' | 'medium' | 'large';
/** Validation / feedback sub-state — maps to `--c-color-*-{error,success,warning}`. */
type CuboState = 'default' | 'error' | 'success' | 'warning';
/**
 * The HTML input types the text field understands. `number` is special: it is
 * the only one whose value is a `number` rather than a `string` (see
 * {@link CuboTextValue}). Everything else — including `date` — is string-valued,
 * matching how the DOM exposes those inputs.
 */
type CuboInputType = 'text' | 'search' | 'email' | 'url' | 'tel' | 'password' | 'number' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';
/**
 * The value type implied by an input type.
 *
 * - `htmlType="number"` ⇒ `number | null` (`null` represents an empty field).
 * - any other type ⇒ `string`.
 *
 * This is what makes `<CuboText>` *generically typed*: pick the html type and
 * the value / change-handler types follow automatically.
 */
type CuboTextValue<T extends CuboInputType = 'text'> = T extends 'number' ? number | null : string;
declare const CUBO_SIZES: readonly ["small", "medium", "large"];
declare const CUBO_STATES: readonly ["default", "error", "success", "warning"];
declare const CUBO_INPUT_TYPES: readonly ["text", "search", "email", "url", "tel", "password", "number", "date", "time", "datetime-local", "month", "week"];

/**
 * Default status icon shown in the suffix slot for each feedback sub-state.
 * Suppressed when the field is loading or when a custom suffix is provided.
 */
declare const STATE_ICON: Record<Exclude<CuboState, 'default'>, IconName>;

type CuboPopoverPosition = 'top' | 'top_right' | 'top_left' | 'bottom' | 'bottom_right' | 'bottom_left' | 'right' | 'left';
/** Alias used by CuboPopup / CuboTooltip props. */
type CuboPopupPosition = CuboPopoverPosition;

type CuboCalendarType = 'single' | 'range' | 'multiple';
/** The value shape for a given calendar `type`. */
type CuboCalendarValue<T extends CuboCalendarType> = T extends 'single' ? Date : Date[];
interface CuboCalendarCell {
    /** The instant for this day's midnight (in the calendar's timezone). */
    date: Date;
    year: number;
    /** 0–11. */
    month: number;
    /** 1–31. */
    day: number;
    /** Belongs to the displayed month (vs leading/trailing padding). */
    inMonth: boolean;
    isToday: boolean;
    /** 0 (Sun) – 6 (Sat). */
    weekday: number;
}
interface CuboCalendarPreset<T extends CuboCalendarType = CuboCalendarType> {
    label: string;
    value: CuboCalendarValue<T>;
}

/** Which inline control a field renders. */
type CuboCardFieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'multiselect' | 'user' | 'switch';
/** A choosable option for a `select` / `multiselect` field. */
interface CuboCardFieldOption {
    label: string;
    value: string | number;
    /** Tint (a CuboColor name) used when the value renders as a badge. */
    color?: string;
}
/** A person referenced by a `user` field (and reused for entity avatars). */
interface CuboCardUser {
    id: string | number;
    name: string;
    avatar?: string;
}
/**
 * One field row: a fixed-width label at the start, the value/editor at the end.
 * The card is controlled — the consumer owns `value` and persists `onFieldChange`.
 */
interface CuboCardField<N = unknown> {
    /** Stable key (also the `onFieldChange` key). */
    key: string;
    label: string;
    /** Which inline control to render. @default 'text' */
    type?: CuboCardFieldType;
    /** Current value (controlled). */
    value?: unknown;
    /** Options for `select` / `multiselect`. */
    options?: CuboCardFieldOption[];
    /** People for a `user` field's picker. */
    users?: CuboCardUser[];
    placeholder?: string;
    /** Show the value but disallow editing. */
    readonly?: boolean;
    /** Render the selected `select` value as a coloured badge (display only). */
    badge?: boolean;
    /** Custom value renderer (display only; overrides the built-in control). */
    render?: (value: unknown) => N;
}
/** A collapsible group of fields (rendered as a <CuboExpander>). */
interface CuboCardGroup<N = unknown> {
    key: string;
    label: string;
    icon?: string;
    fields: CuboCardField<N>[];
    /** Start collapsed. @default false */
    collapsed?: boolean;
}
/** A linked entity — the target of a one-one / one-many relation. */
interface CuboCardEntity<N = unknown> {
    id: string | number;
    label: string;
    /** Secondary line (e.g. a role, status, or amount). */
    description?: string;
    avatar?: string;
    /** Leading icon (used when there's no avatar). */
    icon?: string;
    /** Deep-link / route for the linked record. */
    href?: string;
    /** Fields shown in the detail modal when this entity's card is clicked. */
    fields?: CuboCardField<N>[];
}
/** A relation block: one (one-one) or many (one-many) linked entities. */
interface CuboCardRelation<N = unknown> {
    key: string;
    label: string;
    /** 'one' = a single linked entity; 'many' = a list. @default 'one' */
    kind?: 'one' | 'many';
    entities: CuboCardEntity<N>[];
    /** Text shown when there are no linked entities. */
    emptyText?: string;
    /**
     * Candidate entities offered in the "attach" picker (a CuboData modal). When
     * present, an attach control is shown; picking one fires the attach handler.
     */
    attachable?: CuboCardEntity<N>[];
    /** Label for the attach control. @default "Attach …" */
    attachLabel?: string;
}
/** One tab's content: any subset of fields, grouped fields, and relations. */
interface CuboCardTab<N = unknown> {
    key: string;
    label: string;
    icon?: string;
    fields?: CuboCardField<N>[];
    groups?: CuboCardGroup<N>[];
    relations?: CuboCardRelation<N>[];
}

interface CuboHSV {
    /** Hue, 0–360. */
    h: number;
    /** Saturation, 0–1. */
    s: number;
    /** Value/brightness, 0–1. */
    v: number;
}
type CuboRGB = [number, number, number];
declare function cuboHexToRgb(hex: string): CuboRGB;
declare function cuboRgbToHex([r, g, b]: CuboRGB): string;
declare function cuboHexToHsv(hex: string): CuboHSV;
declare function cuboHsvToHex(hsv: CuboHSV): string;
/** Validate/normalise a hex string → `#rrggbb` lowercase, or null if invalid. */
declare function cuboNormalizeHex(input: string): string | null;

type CuboDataFieldType = 'text' | 'number' | 'boolean' | 'date' | 'timestamp' | 'select' | 'multiselect';
interface CuboDataFieldOption {
    label: string;
    value: string | number;
    /** Named CuboColor or any CSS colour — tints the badge in cards/pipeline. */
    color?: string;
}
/**
 * Context handed to a field's `format` renderer. `row` is typed as the data
 * Model (`R`) when `CuboData` is parameterised by its `rows` element type;
 * `change` applies an inline patch to that row (optimistic, in the rendered
 * list — and forwarded to `onRowChange` for the consumer to persist).
 */
interface CuboDataFormatContext<R = Record<string, unknown>> {
    value: unknown;
    row: R;
    change: (patch: Partial<R>) => void;
    /** Open this row's detail (same as a row click). */
    showDetail: () => void;
}
interface CuboDataField<R = Record<string, unknown>> {
    key: string;
    label: string;
    type: CuboDataFieldType;
    /** Options for `select` / `multiselect` (and the pipeline columns). */
    options?: CuboDataFieldOption[];
    /**
     * Whether this field is a TABLE COLUMN (offered in the columns list / config).
     * `false` keeps it out of the columns entirely — useful for a field that only
     * exists to be sorted / filtered / grouped by. @default true
     */
    column?: boolean;
    /** Override the type defaults. */
    sortable?: boolean;
    groupable?: boolean;
    filterable?: boolean;
    /**
     * The identifier this field uses in a FILTER (the `field` stored in
     * `CuboDataFilter`, and so what travels to the URL + the `onFetch` context).
     * Defaults to `key`; set it when the server/query name differs from the row's
     * property key.
     */
    filterKey?: string;
    /** Same as `filterKey`, but for SORTING (the `field` in `CuboDataSort`). */
    sortKey?: string;
    /** Same as `filterKey`, but for GROUPING (the value stored in `query.group`). */
    groupKey?: string;
    /**
     * Derive the FILTER value for this field (overrides the raw cell value) — used
     * by client-side filtering, e.g. when the comparable value differs from what's
     * displayed. Mirrors `groupValue`.
     */
    filterValue?: (row: R) => unknown;
    /**
     * Derive the group-membership value for this field (overrides the raw value)
     * — e.g. bucket a date into a month, or a number into a range. Used by
     * grouping; the returned value is matched against `options` for the label.
     */
    groupValue?: (row: R) => unknown;
    /** Table column width in px. */
    width?: number;
    /**
     * Custom cell renderer. Returns a CuboSlot (string OR a framework node), so a
     * cell can render rich/interactive content — call `ctx.change({ … })` to edit
     * the row inline. The plain display string (search / titles / sort) is the
     * type default; `format` is presentational only.
     */
    format?: (ctx: CuboDataFormatContext<R>) => unknown;
}
type CuboDataViewType = 'table' | 'cards' | 'pipeline';
type CuboDataOp = 'eq' | 'ne' | 'contains' | 'notContains' | 'gt' | 'gte' | 'lt' | 'lte' | 'between' | 'before' | 'after' | 'in' | 'notIn' | 'isTrue' | 'isFalse' | 'empty' | 'notEmpty';
interface CuboDataFilter {
    field: string;
    op: CuboDataOp;
    value?: unknown;
    /** Upper bound for `between`. */
    value2?: unknown;
    /**
     * Marks this as a "Fast" filter (the one-input-per-field tab) rather than an
     * "Extendable" one (the operator-picker tab). Both kinds live together in
     * `CuboDataQuery.filters` and are applied identically; the flag only tells the
     * two filter tabs which rows belong to each.
     */
    fast?: boolean;
}
interface CuboDataSort {
    field: string;
    dir: 'asc' | 'desc';
}
interface CuboDataPreset {
    id: string;
    name: string;
    view?: CuboDataViewType;
    /** All filters — Fast ones carry `fast: true`, Extendable ones don't. */
    filters?: CuboDataFilter[];
    sort?: CuboDataSort[];
    group?: string | null;
    search?: string;
    /** Ordered list of VISIBLE table column keys (order + visibility). */
    columns?: string[];
    /** Render as a top-level tab that scopes the whole view. */
    primary?: boolean;
    /** The fallback view (can't be deleted; selected when nothing else is). */
    isDefault?: boolean;
    /** Optional tab/badge colour. */
    color?: string;
}
/** The full, serialisable state of a CuboData view. */
interface CuboDataQuery {
    view: CuboDataViewType;
    /**
     * ALL filters (both tabs), applied together (AND). A filter from the "Fast"
     * tab (one canonical input per field) carries `fast: true`; an "Extendable"
     * filter (operator picker, multiple per field) leaves it unset. The two tabs
     * partition this one list by the `fast` flag, so they never clobber each other.
     */
    filters: CuboDataFilter[];
    sort: CuboDataSort[];
    group: string | null;
    search: string;
    preset: string | null;
    /**
     * Ordered list of VISIBLE table column keys — encodes both column order and
     * visibility. `undefined` means the default (all fields in their declared
     * order). Persisted in presets / the URL like the rest of the query.
     */
    columns?: string[];
}
type CuboDataRowKey<R> = keyof R | ((row: R) => string | number);

/** A person referenced by an event (author / assignee / target). */
interface CuboEventUser {
    id: string | number;
    name: string;
    /** Avatar image URL; falls back to initials when absent. */
    avatar?: string;
    /** Optional role/title shown under the name. */
    role?: string;
}
/** A file attached to a message/task/any event. */
interface CuboEventAttachment {
    id: string | number;
    name: string;
    url?: string;
    /** Bytes (rendered human-readable). */
    size?: number;
    /** MIME type or a short kind ('image' | 'pdf' | …) for the icon. */
    type?: string;
}
type CuboEventType = 'system' | 'task' | 'message' | 'field-change';
interface CuboEventBase {
    id: string | number;
    type: CuboEventType;
    /** When it happened — Date, ISO string, or epoch ms. */
    createdAt: Date | string | number;
    author?: CuboEventUser;
}
/** Plain system line ("Deal created", "Stage → Won"). */
interface CuboSystemEvent extends CuboEventBase {
    type: 'system';
    text: string;
    icon?: string;
}
/** One completion outcome offered for a task (picking it completes the task). */
interface CuboTaskResultOption {
    /** Shown on the button + the result chip. */
    label: string;
    /** Stored on the task's `result` when chosen. */
    value: string;
    /** Tint (a CuboColor name) for the button + chip. @default 'success' */
    color?: string;
}
/** A task card with an assignee and a completion toggle. */
interface CuboTaskEvent extends CuboEventBase {
    type: 'task';
    title: string;
    description?: string;
    assignee?: CuboEventUser;
    done?: boolean;
    dueAt?: Date | string | number;
    attachments?: CuboEventAttachment[];
    /** Who completed it — shown (with the time) on a done task. */
    completedBy?: CuboEventUser;
    /** When it was completed — shown on a done task. */
    completedAt?: Date | string | number;
    /** The chosen completion outcome's `value` (when done with result options). */
    result?: string;
    /** Optional completion outcomes; when present, completing picks one of them. */
    resultOptions?: CuboTaskResultOption[];
}
/** A user message (who / when / text, optional attachments). */
interface CuboMessageEvent extends CuboEventBase {
    type: 'message';
    text: string;
    attachments?: CuboEventAttachment[];
    /** Ids of users `@`-mentioned in {@link text} (informational; the timeline
     *  also highlights any `@name` matching a known user without this). */
    mentions?: (string | number)[];
}
/** A field-change diff ("Owner: Ada → Grace"). */
interface CuboFieldChangeEvent extends CuboEventBase {
    type: 'field-change';
    field: string;
    from?: unknown;
    to?: unknown;
}
type CuboTimelineEvent = CuboSystemEvent | CuboTaskEvent | CuboMessageEvent | CuboFieldChangeEvent;
/** A choosable option for a `select` / `multiselect` field. */
interface CuboTimelineFieldOption {
    label: string;
    value: string | number;
}
/** One field in a custom event type's creation form. */
interface CuboTimelineField {
    /** Key the value is stored under in the draft's `values`. */
    key: string;
    label: string;
    /** Which input to render. @default 'text' */
    type?: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'multiselect' | 'user';
    required?: boolean;
    placeholder?: string;
    /**
     * Options for `select` / `multiselect`. Pass an array, or a function of the
     * form's current values so the options can depend on another field — e.g. a
     * task's `results` whose choices vary by the chosen task type. Pair a dynamic
     * field with {@link CuboTimelineField.dependsOn} so its value resets when the
     * field it depends on changes.
     */
    options?: CuboTimelineFieldOption[] | ((values: Record<string, unknown>) => CuboTimelineFieldOption[]);
    /** Reset this field's value whenever the field with this `key` changes. */
    dependsOn?: string;
}
/**
 * A consumer-defined event type: a "+ create" button + popup form (`fields`) and
 * an optional card renderer (`render`). Generic over the rendered node type `N`
 * (ReactNode / VNodeChild) so each flavour specialises it.
 */
interface CuboTimelineEventType<E = CuboTimelineEvent, N = unknown> {
    /** The event's `type` discriminator (matched against `event.type`). */
    type: string;
    /** Label for the "+ <button>" above the composer. @default the capitalised type */
    button?: string;
    /** Icon for the "+ <button>". */
    icon?: string;
    /** Creation-form fields. Omit for a render-only type (no "+" button). */
    fields?: CuboTimelineField[];
    /**
     * Render this event's card (takes precedence over the built-in renderers).
     * The event is widened with an index signature so a custom type's own fields
     * (e.g. a chat's `channel`/`message`, which aren't on the built-in union) are
     * readable here without casting to `any`.
     */
    render?: (event: E & Record<string, unknown>) => N;
}
/** What the composer emits when the user posts a new event. */
interface CuboTimelineDraft {
    /** The event type — `'message'` for the quick box, else a custom type's `type`. */
    type: string;
    /** The message box's text (only for `type: 'message'`). */
    text?: string;
    /** Ids of users `@`-mentioned while composing (message text or a custom
     *  type's textarea fields). Each is auto-subscribed to the entity. */
    mentions?: (string | number)[];
    /** Field values keyed by `CuboTimelineField.key` (for a custom event type). */
    values?: Record<string, unknown>;
    attachments?: File[];
}
interface CuboNotification {
    id: string | number;
    /** Has the user seen it? */
    read: boolean;
    title?: string;
    text: string;
    createdAt: Date | string | number;
    author?: CuboEventUser;
    /** Mirrors event types so the icon/colour matches the timeline. */
    type?: CuboEventType;
    icon?: string;
    /** Deep-link / route for "open". */
    href?: string;
}

interface CuboPaginationItem {
    type: 'number' | 'dots' | 'arrow';
    /** Display label (page number, '…', or an arrow glyph). */
    label: string | number;
    /** Target page (for `number` / `arrow`). */
    value?: number;
    disabled: boolean;
    active?: boolean;
    /** For arrows. */
    direction?: 'prev' | 'next';
}

type CuboSelectValue = string | number;
interface CuboSelectVariant<T extends CuboSelectValue = CuboSelectValue> {
    label?: string;
    value?: T;
    disabled?: boolean;
    /** Flat grouping key — options sharing a group render under one header. */
    group?: string;
    /** Render as a non-selectable separator line instead of an option. */
    divider?: boolean;
    /** Muted second line under the label (custom dropdown only — a native
     *  `<option>` can't render it). */
    description?: string;
}
/**
 * Where the selected-row marker sits in the options box.
 * `'left'` (default) — check/checkbox in a fixed leading column;
 * `'right'` — trailing check, labels stay flush left (clean alignment);
 * `'none'` — no marker, selection reads through color only.
 */
type CuboSelectCheckPosition = 'left' | 'right' | 'none';
/**
 * How a selected option row is painted.
 * `'accent'` (default) — primary-colored label/check;
 * `'neutral'` — muted fill, normal text, check inherits text color (gray pill).
 */
type CuboSelectSelectedTone = 'accent' | 'neutral';
/**
 * Which pointer event commits an option / select-all row.
 * `'click'` (default) commits on click; `'mousedown'` preserves the legacy
 * commit-on-mousedown timing. Either way mousedown is prevented so the search
 * input keeps focus and outside-mousedown close handlers don't fire.
 */
type CuboSelectTriggerEvent = 'click' | 'mousedown';
/** Framework-agnostic props of the standalone variants/options box. */
interface CuboSelectVariantsBaseProps<T extends CuboSelectValue = CuboSelectValue> {
    variants?: CuboSelectVariant<T>[];
    /** Selected value(s) — an array in `multiple` mode, otherwise a scalar. */
    value?: T | T[];
    /** Multi-select rows (checkboxes). @default false */
    multiple?: boolean;
    /** Show a tri-state "Select all" row (multiple only). @default false */
    selectAll?: boolean;
    /** Show a centered spinner instead of the rows. @default false */
    loading?: boolean;
    /** Row scale. @default "medium" */
    size?: CuboSize;
    /** Index of the keyboard/pointer-highlighted row (in `variants` order). */
    highlightedIndex?: number;
    /** Pointer event that commits a row. @default "click" */
    triggerEvent?: CuboSelectTriggerEvent;
    /** Text shown when there are no variants. @default "No results" */
    emptyText?: string;
    /** Selected-row marker placement. @default "right" */
    checkPosition?: CuboSelectCheckPosition;
    /** Selected-row paint. @default "neutral" */
    selectedTone?: CuboSelectSelectedTone;
}
/**
 * Props valid in BOTH select modes — the rich custom dropdown AND the platform
 * `<select>` (`native`). A native `<select>` honours all of these.
 */
interface CuboSelectBaseProps<M extends boolean = false, T extends CuboSelectValue = CuboSelectValue> {
    /** Controlled selection — an array when `multiple`, otherwise a scalar. */
    value?: M extends true ? T[] : T;
    variants?: CuboSelectVariant<T>[];
    /** Multi-select. @default false */
    multiple?: M;
    disabled?: boolean;
    /** Invalid-value state — danger border + focus ring (both modes). @default false */
    error?: boolean;
    /** Height scale. @default "medium" */
    size?: CuboSize;
    placeholder?: string;
    /**
     * Render a platform `<select>` (skinned to match) instead of the custom
     * dropdown — ideal on mobile. A native select can't honour the rich-dropdown
     * props (`searchable`, `clearable`, `position`, …), so setting any of them
     * alongside `native` is a TYPE ERROR. @default false
     */
    native?: boolean;
}
/**
 * Props that ONLY apply to the rich custom dropdown. They are FORBIDDEN when
 * `native` is true — a platform `<select>` can't honour them, so each becomes
 * `?: never` in native mode (setting one is a type error). See `CuboSelectProps`.
 */
interface CuboSelectCustomProps<T extends CuboSelectValue = CuboSelectValue> {
    /** In-panel search box. @default false */
    searchable?: boolean;
    /** Show a tri-state "Select all" row (multiple only). @default false */
    selectAll?: boolean;
    /** Show the clear (×) button when a value is set. @default false */
    clearable?: boolean;
    readonly?: boolean;
    loading?: boolean;
    /** Panel placement relative to the trigger. @default "bottom_left" */
    position?: CuboPopupPosition;
    searchPlaceholder?: string;
    /** Max value labels shown in the trigger before "+N". @default 3 */
    maxTagCount?: number;
    /** Put a remove (×) button on each trigger tag in `multiple` mode. @default false */
    tagsRemovable?: boolean;
    /** Show every selected tag in the trigger (no "+N"); the trigger grows and tags wrap. @default false */
    tagsWrap?: boolean;
    /** Selected-row marker placement in the panel. @default "right" */
    checkPosition?: CuboSelectCheckPosition;
    /** Selected-row paint in the panel. @default "neutral" */
    selectedTone?: CuboSelectSelectedTone;
    /** Override the default substring filter; `null` disables filtering. */
    filterFn?: ((query: string, variants: CuboSelectVariant<T>[]) => CuboSelectVariant<T>[]) | null;
    /** Portal/teleport target for the panel (resolved via `cuboPortalTarget`). */
    teleportSelector?: string;
    /** Pointer event that commits an option. @default "click" */
    triggerEvent?: CuboSelectTriggerEvent;
    /**
     * id(s) of element(s) naming the combobox — forwarded to the `role="combobox"`
     * trigger as `aria-labelledby` (a wrapping `<label>` can't name a `<div>`).
     */
    ariaLabelledby?: string;
    /** Mark the combobox as required for assistive tech. @default false */
    ariaRequired?: boolean;
}
/**
 * Forbids every key of `P`: each becomes `?: never`, so passing a real value for
 * any of them is a TYPE ERROR (while omitting them stays valid). Used to disable
 * the custom-dropdown props in `native` mode.
 */
type CuboSelectForbidden<P> = {
    [K in keyof P]?: never;
};
/**
 * The full framework-agnostic CuboSelect prop set — a discriminated union on
 * `native`: the custom-dropdown props are available when `native` is false/unset
 * and FORBIDDEN (type error) when `native` is true.
 */
type CuboSelectProps<M extends boolean = false, T extends CuboSelectValue = CuboSelectValue> = CuboSelectBaseProps<M, T> & (({
    native?: false;
} & CuboSelectCustomProps<T>) | ({
    native: true;
} & CuboSelectForbidden<CuboSelectCustomProps<T>>));

interface CuboSortableItem {
    id: string | number;
    [key: string]: unknown;
}
/**
 * Passed to `onAdd` when a row is dragged from one `<CuboSortable>` into another
 * of the same `group`. The handler removes `row` from `from.rows` and inserts it
 * into `to.rows` at `to.index` (an insertion gap `0..to.rows.length`).
 */
interface CuboSortableAddContext<T extends CuboSortableItem = CuboSortableItem> {
    /** The dragged row. */
    row: T;
    /** Source sortable: its `name`, current rows, and the row's index there. */
    from: {
        name?: string;
        rows: T[];
        index: number;
    };
    /** Target sortable (this one): its `name`, current rows, and the insertion gap. */
    to: {
        name?: string;
        rows: T[];
        index: number;
    };
}
type CuboSortablePosition = 'before' | 'after';

declare const en: {
    modal: {
        close: string;
    };
    drawer: {
        close: string;
    };
    table: {
        empty: string;
    };
    select: {
        placeholder: string;
        searchPlaceholder: string;
        empty: string;
        selectAll: string;
    };
    search: {
        placeholder: string;
        empty: string;
    };
    dropdown: {
        searchPlaceholder: string;
        searchLabel: string;
        empty: string;
        menu: string;
    };
    inlineConfirm: {
        yes: string;
        no: string;
    };
    alert: {
        ok: string;
    };
    confirm: {
        yes: string;
        no: string;
    };
    messages: {
        dismiss: string;
    };
    pagination: {
        prevPage: string;
        nextPage: string;
        page: string;
    };
    datePicker: {
        selected: string;
        open: string;
    };
    calendar: {
        previous: string;
        next: string;
        previousMonth: string;
        nextMonth: string;
        previousYear: string;
        nextYear: string;
        switchView: string;
        from: string;
        to: string;
    };
    timeline: {
        empty: string;
        composerPlaceholder: string;
        send: string;
        attach: string;
        removeAttachment: string;
        manageFollowers: string;
        followers: string;
        owner: string;
        createTitle: string;
        create: string;
        cancel: string;
        requiredHint: string;
        chooseUser: string;
        complete: string;
        reopen: string;
        completedBy: string;
        completed: string;
        unknownAuthor: string;
        mentionMenu: string;
    };
    eventsBox: {
        title: string;
        tabNew: string;
        tabAll: string;
        readAll: string;
        emptyNew: string;
        emptyAll: string;
    };
    card: {
        yes: string;
        no: string;
        chooseUser: string;
        detach: string;
        attachEmpty: string;
        attachColName: string;
        attachColDetail: string;
        add: string;
        attachLabel: string;
        mainTab: string;
        timelineTab: string;
        saving: string;
        empty: string;
    };
    data: {
        detailTitle: string;
        create: {
            title: string;
            button: string;
            submit: string;
            cancel: string;
        };
        detail: {
            discardTitle: string;
            discardBody: string;
            discardConfirm: string;
            discardKeep: string;
        };
        emptyValue: string;
        empty: {
            title: string;
            descriptionFiltered: string;
            descriptionEmpty: string;
        };
        status: {
            loading: string;
            resultCount: string;
        };
        search: {
            placeholder: string;
            ariaLabel: string;
            clear: string;
            searching: string;
            noResults: string;
            resultsAriaLabel: string;
        };
        filters: {
            popAriaLabel: string;
            clearTitle: string;
            clearCount: string;
            clearLabel: string;
            toggle: string;
            apply: string;
            cancel: string;
            valuePlaceholder: string;
            removeAriaLabel: string;
            add: string;
        };
        preset: {
            saveActiveAriaLabel: string;
            saveActiveLabel: string;
            lockedTitle: string;
            nameAriaLabel: string;
            namePlaceholder: string;
            defaultToggle: string;
            pinnedToggle: string;
            editSave: string;
            editCancel: string;
            removeTitle: string;
            saveChanges: string;
            createAriaLabel: string;
            createCancelAriaLabel: string;
            saveAsNew: string;
            editTitle: string;
            removeAriaLabel: string;
        };
        group: {
            pipelinePlaceholder: string;
            placeholder: string;
        };
        columns: {
            ariaLabel: string;
            label: string;
        };
        view: {
            table: string;
            cards: string;
            pipeline: string;
        };
        tab: {
            fast: string;
            extendable: string;
            columns: string;
            misc: string;
        };
        fast: {
            min: string;
            max: string;
            any: string;
            boolAny: string;
            boolYes: string;
            boolNo: string;
            textPlaceholder: string;
            empty: string;
        };
        misc: {
            groupByLabel: string;
            groupByPlaceholder: string;
            defaultViewLabel: string;
        };
        pipeline: {
            emptyTitle: string;
            emptyDescription: string;
            regionAriaLabel: string;
        };
    };
    form: {
        submit: string;
        reset: string;
        required: string;
    };
};
/** The shape of the kit's built-in strings — `en` is the source of truth. */
type CuboKitMessages = typeof en;
/** The kit's built-in strings, keyed by language. */
declare const CUBO_KIT_TRANSLATIONS: Record<CuboLanguage, CuboKitMessages>;
/** Every dotted key into the kit messages, e.g. `'table.empty'`. */
type CuboKitMessageKey = CuboDotify<CuboKitMessages>;
/**
 * A translator bound to `language` (resolved, en-fallback) over the kit's own
 * strings. Components call `const t = cuboKitT(lang); t('table.empty')`.
 */
declare function cuboKitT(language?: string | null): (key: CuboKitMessageKey, replacements?: Record<string, string | number>) => string;

/** Slot content: text, a VNode, or a function returning either. */
type CuboSlot = string | VNodeChild | (() => string | VNodeChild);

/**
 * A component's own props + native DOM attributes/events (onClick, onMouseenter,
 * id, role, data-*, …). The component's own props win on any name clash, so a
 * custom handler (e.g. a typed `onChange`) is preserved over the native one.
 *
 * Used in the `as unknown as { new(): { $props } }` overlay each component
 * exports, so TSX consumers can attach native listeners. (Vue already forwards
 * them at runtime via attribute fall-through; this only fixes the JSX types.)
 */
type WithNativeProps<P> = P & VNodeProps & Omit<HTMLAttributes, keyof P>;

interface CuboAlertProps {
    visible?: boolean;
    color?: CuboColor;
    icon?: CuboIconName;
    title?: CuboSlot;
    content?: CuboSlot;
    primaryButton?: CuboSlot;
    language?: CuboLanguage;
    teleportSelector?: string;
    onSubmit?: () => void;
    onSetVisible?: (value: boolean) => void;
}
declare const CuboAlert: {
    new (): {
        $props: WithNativeProps<CuboAlertProps>;
        $slots: {
            default?: () => VNodeChild;
            title?: () => VNodeChild;
            primaryButton?: () => VNodeChild;
        };
    };
};

/** Options for an imperative alert (single Ok button). */
interface CuboAlertOptions {
    color?: CuboColor;
    icon?: CuboIconName;
    title?: CuboSlot;
    content?: CuboSlot;
    /** Custom Ok-button content. */
    primaryButton?: CuboSlot;
    /** Override the inherited language for this dialog. */
    language?: CuboLanguage;
    teleportSelector?: string;
    /** Runs when Ok is pressed (awaited before the dialog closes). */
    onSubmit?: () => void | Promise<void>;
}
/** Options for an imperative confirm (Yes / No buttons). */
interface CuboConfirmOptions extends CuboAlertOptions {
    /** Custom No-button content. */
    secondaryButton?: CuboSlot;
    primaryDisabled?: boolean;
    /** Runs when No / backdrop / Escape dismisses (awaited before closing). */
    onCancel?: () => void | Promise<void>;
}
/** Show a confirm dialog; resolves `true` on Yes, `false` on No / dismiss. */
declare function cuboConfirm(opts?: CuboConfirmOptions): Promise<boolean>;
/** Show an alert dialog; resolves once acknowledged / dismissed. */
declare function cuboAlert(opts?: CuboAlertOptions): Promise<void>;
/** `const confirm = useConfirm(); await confirm({ … })` — resolves true/false. */
declare function useConfirm(): (opts?: CuboConfirmOptions) => Promise<boolean>;
/** `const alert = useAlert(); await alert({ … })` — resolves on close. */
declare function useAlert(): (opts?: CuboAlertOptions) => Promise<void>;

declare const TAG_TONES: readonly ["neutral", "primary", "success", "warning", "danger", "info", "feature"];
declare const TAG_APPEARANCES: readonly ["soft", "solid", "outline"];
declare const TAG_SIZES: readonly ["small", "medium", "large"];
declare const TAG_SHAPES: readonly ["rounded", "pill"];
declare const CHIP_STATES: readonly ["default", "hover", "active", "focus", "selected", "disabled"];
declare const CHIP_KINDS: readonly ["filter", "input", "action", "link"];
declare const BADGE_APPEARANCES: readonly ["solid", "soft"];
type TagTone = (typeof TAG_TONES)[number];
type TagAppearance = (typeof TAG_APPEARANCES)[number];
type TagSize = (typeof TAG_SIZES)[number];
type TagShape = (typeof TAG_SHAPES)[number];
type ChipState = (typeof CHIP_STATES)[number];
type ChipKind = (typeof CHIP_KINDS)[number];
type BadgeAppearance = (typeof BADGE_APPEARANCES)[number];
declare const CUBO_TAG_ICONS: readonly ["check", "clock", "alert", "user", "file", "star", "lock"];
type CuboTagIconName = (typeof CUBO_TAG_ICONS)[number];
declare const CuboTag: vue.DefineComponent<vue.ExtractPropTypes<{
    /** Число после подписи: «Документы 12». Не индикатор — часть текста. */
    count: {
        type: PropType<number | null>;
        default: null;
    };
    tone: {
        type: PropType<TagTone>;
        default: string;
    };
    appearance: {
        type: PropType<TagAppearance>;
        default: string;
    };
    size: {
        type: PropType<TagSize>;
        default: string;
    };
    shape: {
        type: PropType<TagShape>;
        default: string;
    };
    /** Точка-статус слева: цвет несёт смысл, но не остаётся единственным носителем. */
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: PropType<CuboTagIconName | null>;
        default: null;
    };
    /** Обрезать длинную подпись многоточием (узкие колонки таблиц). */
    truncate: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Полный текст для обрезанной подписи. Усечение обязано раскрываться по
     * ховеру (Spectrum), иначе часть смысла просто пропадает.
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}>, () => JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /** Число после подписи: «Документы 12». Не индикатор — часть текста. */
    count: {
        type: PropType<number | null>;
        default: null;
    };
    tone: {
        type: PropType<TagTone>;
        default: string;
    };
    appearance: {
        type: PropType<TagAppearance>;
        default: string;
    };
    size: {
        type: PropType<TagSize>;
        default: string;
    };
    shape: {
        type: PropType<TagShape>;
        default: string;
    };
    /** Точка-статус слева: цвет несёт смысл, но не остаётся единственным носителем. */
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: PropType<CuboTagIconName | null>;
        default: null;
    };
    /** Обрезать длинную подпись многоточием (узкие колонки таблиц). */
    truncate: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Полный текст для обрезанной подписи. Усечение обязано раскрываться по
     * ховеру (Spectrum), иначе часть смысла просто пропадает.
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    title: string;
    icon: "check" | "clock" | "alert" | "user" | "file" | "star" | "lock" | null;
    size: "small" | "medium" | "large";
    tone: "primary" | "neutral" | "danger" | "success" | "info" | "warning" | "feature";
    appearance: "soft" | "solid" | "outline";
    shape: "rounded" | "pill";
    count: number | null;
    dot: boolean;
    truncate: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const CuboChip: vue.DefineComponent<vue.ExtractPropTypes<{
    /** Роль чипа: filter (переключатель) / input (тег в поле) / action (кнопка). */
    kind: {
        type: PropType<ChipKind>;
        default: string;
    };
    /** Включён (фильтр). Пишется в aria-pressed — состояние слышно скринридеру. */
    selected: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Недоступен. Это aria-disabled, а не нативный disabled: выключенный фильтр
     * должен оставаться в таб-порядке — иначе о нём просто не узнают.
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Крестик: отдельная кнопка внутри чипа со своим фокусом. */
    removable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Метка для крестика. По умолчанию — «Убрать». */
    removeLabel: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Адрес перехода для kind=link. Тело рендерится настоящим <a> (канон §8:
     * кликабельное — только button или a), крестик остаётся сиблингом —
     * интерактив не вкладывается в ссылку (модель Polaris url + onRemove).
     */
    href: {
        type: StringConstructor;
        default: string;
    };
    /** Форсаж состояния для витрин (в проде не используется). */
    state: {
        type: PropType<ChipState | null>;
        default: null;
    };
    tone: {
        type: PropType<TagTone>;
        default: string;
    };
    appearance: {
        type: PropType<TagAppearance>;
        default: string;
    };
    size: {
        type: PropType<TagSize>;
        default: string;
    };
    shape: {
        type: PropType<TagShape>;
        default: string;
    };
    /** Точка-статус слева: цвет несёт смысл, но не остаётся единственным носителем. */
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: PropType<CuboTagIconName | null>;
        default: null;
    };
    /** Обрезать длинную подпись многоточием (узкие колонки таблиц). */
    truncate: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Полный текст для обрезанной подписи. Усечение обязано раскрываться по
     * ховеру (Spectrum), иначе часть смысла просто пропадает.
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}>, () => JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("select" | "remove")[], "select" | "remove", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /** Роль чипа: filter (переключатель) / input (тег в поле) / action (кнопка). */
    kind: {
        type: PropType<ChipKind>;
        default: string;
    };
    /** Включён (фильтр). Пишется в aria-pressed — состояние слышно скринридеру. */
    selected: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Недоступен. Это aria-disabled, а не нативный disabled: выключенный фильтр
     * должен оставаться в таб-порядке — иначе о нём просто не узнают.
     */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Крестик: отдельная кнопка внутри чипа со своим фокусом. */
    removable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Метка для крестика. По умолчанию — «Убрать». */
    removeLabel: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Адрес перехода для kind=link. Тело рендерится настоящим <a> (канон §8:
     * кликабельное — только button или a), крестик остаётся сиблингом —
     * интерактив не вкладывается в ссылку (модель Polaris url + onRemove).
     */
    href: {
        type: StringConstructor;
        default: string;
    };
    /** Форсаж состояния для витрин (в проде не используется). */
    state: {
        type: PropType<ChipState | null>;
        default: null;
    };
    tone: {
        type: PropType<TagTone>;
        default: string;
    };
    appearance: {
        type: PropType<TagAppearance>;
        default: string;
    };
    size: {
        type: PropType<TagSize>;
        default: string;
    };
    shape: {
        type: PropType<TagShape>;
        default: string;
    };
    /** Точка-статус слева: цвет несёт смысл, но не остаётся единственным носителем. */
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: PropType<CuboTagIconName | null>;
        default: null;
    };
    /** Обрезать длинную подпись многоточием (узкие колонки таблиц). */
    truncate: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Полный текст для обрезанной подписи. Усечение обязано раскрываться по
     * ховеру (Spectrum), иначе часть смысла просто пропадает.
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onSelect?: ((...args: any[]) => any) | undefined;
    onRemove?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    icon: "check" | "clock" | "alert" | "user" | "file" | "star" | "lock" | null;
    disabled: boolean;
    size: "small" | "medium" | "large";
    tone: "primary" | "neutral" | "danger" | "success" | "info" | "warning" | "feature";
    appearance: "soft" | "solid" | "outline";
    state: "disabled" | "default" | "hover" | "active" | "focus" | "selected" | null;
    shape: "rounded" | "pill";
    href: string;
    selected: boolean;
    dot: boolean;
    truncate: boolean;
    kind: "filter" | "input" | "action" | "link";
    removable: boolean;
    removeLabel: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const CuboTagGroup: vue.DefineComponent<vue.ExtractPropTypes<{
    /** Обязательная метка группы: без неё скринридер читает мешок кнопок. */
    label: {
        type: StringConstructor;
        required: true;
    };
    /** Показывать метку глазами, а не только для скринридера. */
    showLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Сколько чипов показывать до «+N ещё». 0 — показывать все. */
    maxVisible: {
        type: NumberConstructor;
        default: number;
    };
    /** Кнопка «Очистить всё» справа. */
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearLabel: {
        type: StringConstructor;
        default: string;
    };
    /** Что показать, когда чипов нет. */
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}>, () => JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "clear"[], "clear", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /** Обязательная метка группы: без неё скринридер читает мешок кнопок. */
    label: {
        type: StringConstructor;
        required: true;
    };
    /** Показывать метку глазами, а не только для скринридера. */
    showLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Сколько чипов показывать до «+N ещё». 0 — показывать все. */
    maxVisible: {
        type: NumberConstructor;
        default: number;
    };
    /** Кнопка «Очистить всё» справа. */
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearLabel: {
        type: StringConstructor;
        default: string;
    };
    /** Что показать, когда чипов нет. */
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onClear?: ((...args: any[]) => any) | undefined;
}>, {
    showLabel: boolean;
    maxVisible: number;
    clearable: boolean;
    clearLabel: string;
    emptyText: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const CuboBadge: vue.DefineComponent<vue.ExtractPropTypes<{
    tone: {
        type: PropType<TagTone>;
        default: string;
    };
    appearance: {
        type: PropType<BadgeAppearance>;
        default: string;
    };
    size: {
        type: PropType<TagSize>;
        default: string;
    };
    count: {
        type: PropType<number | null>;
        default: null;
    };
    /** Потолок счётчика: 100 при max=99 показывается как «99+». */
    max: {
        type: NumberConstructor;
        default: number;
    };
    /** Только факт «есть новое», без числа. */
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Бейдж стоит на акцентной подложке (выбранный пункт меню). */
    onAccent: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Что скринридеру: «3 непрочитанных». Без этого счётчик читается как «3». */
    ariaLabel: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Счётчик живой: значение меняется на глазах и об этом надо сообщать.
     * Раньше role=status вешался вместе с ariaLabel — и любой статичный
     * бейдж превращался в live-region, который бубнит при каждой перерисовке.
     */
    live: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    tone: {
        type: PropType<TagTone>;
        default: string;
    };
    appearance: {
        type: PropType<BadgeAppearance>;
        default: string;
    };
    size: {
        type: PropType<TagSize>;
        default: string;
    };
    count: {
        type: PropType<number | null>;
        default: null;
    };
    /** Потолок счётчика: 100 при max=99 показывается как «99+». */
    max: {
        type: NumberConstructor;
        default: number;
    };
    /** Только факт «есть новое», без числа. */
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Бейдж стоит на акцентной подложке (выбранный пункт меню). */
    onAccent: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Что скринридеру: «3 непрочитанных». Без этого счётчик читается как «3». */
    ariaLabel: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Счётчик живой: значение меняется на глазах и об этом надо сообщать.
     * Раньше role=status вешался вместе с ariaLabel — и любой статичный
     * бейдж превращался в live-region, который бубнит при каждой перерисовке.
     */
    live: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    size: "small" | "medium" | "large";
    ariaLabel: string;
    tone: "primary" | "neutral" | "danger" | "success" | "info" | "warning" | "feature";
    appearance: "soft" | "solid";
    count: number | null;
    dot: boolean;
    max: number;
    onAccent: boolean;
    live: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

interface CuboBadgeLegacyProps {
    /** Named colour (autocompletes) or any custom CSS colour. @default "primary" */
    color?: CuboColor;
    /** Size scale. @default "medium" */
    size?: CuboSize;
    /** Soft tint instead of a solid fill. */
    ghost?: boolean;
}
/** @deprecated Use CuboTag for labels or CuboBadge for counters. */
declare const CuboBadgeLegacy: {
    new (): {
        $props: WithNativeProps<CuboBadgeLegacyProps>;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};

interface CuboButtonProps {
    disabled?: boolean;
    loading?: boolean;
    color?: CuboColor;
    size?: CuboSize;
    ghost?: boolean;
    htmlType?: ButtonHTMLAttributes['type'];
    htmlAttrs?: ButtonHTMLAttributes;
    onClick?: (event: MouseEvent) => void;
}
declare const CuboButton: {
    new (): {
        $props: WithNativeProps<CuboButtonProps>;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};

type CuboButtonV2Tone = 'primary' | 'neutral' | 'danger' | 'success' | 'inverse-solid' | 'inverse-light';
type CuboButtonV2Appearance = 'solid' | 'outline' | 'soft' | 'ghost';
type CuboButtonV2State = 'default' | 'hover' | 'pressed' | 'focused';
type CuboButtonV2Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type CuboButtonV2Shape = 'rounded' | 'pill' | 'square';
interface CuboButtonV2Props {
    tone?: CuboButtonV2Tone;
    appearance?: CuboButtonV2Appearance;
    /** Forced state for component showcases; live pseudo-classes still work. */
    state?: CuboButtonV2State;
    size?: CuboButtonV2Size;
    shape?: CuboButtonV2Shape;
    iconOnly?: boolean;
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
    leadIcon?: AllIconNameOrString;
    trailIcon?: AllIconNameOrString;
    /** Accessible name. Required for an icon-only button. */
    ariaLabel?: string;
    htmlType?: ButtonHTMLAttributes['type'];
    htmlAttrs?: ButtonHTMLAttributes;
    onClick?: (event: MouseEvent) => void;
}
declare const CuboButtonV2: {
    new (): {
        $props: WithNativeProps<CuboButtonV2Props>;
        $slots: {
            default?: () => VNodeChild;
            lead?: () => VNodeChild;
            trail?: () => VNodeChild;
        };
    };
};

interface CuboButtonGroupLegacyButton<T> {
    label?: string | VNodeChild | (() => string | VNodeChild);
    value?: T;
    props?: CuboButtonProps;
}
interface CuboButtonGroupLegacyProps<T> {
    value?: T;
    disabled?: boolean;
    buttons: CuboButtonGroupLegacyButton<T>[];
    trigger?: 'click' | 'mousedown';
    onChange?: (value: T) => void;
}
/**
 * Temporary compatibility component for the old selected-state implementation.
 * New code must use CuboTabs, CuboRadio or CuboToggleGroup according to meaning.
 */
declare const CuboButtonGroupLegacy: {
    new <T = string | number>(): {
        $props: CuboButtonGroupLegacyProps<T> & Omit<HTMLAttributes, "onChange">;
    };
};

interface CuboButtonGroupProps {
    /** One size for every action in the group. */
    size?: CuboButtonV2Size;
    /** Accessible name for the related action set. */
    ariaLabel?: string;
    /** Disables every action; an individual child may still be disabled itself. */
    disabled?: boolean;
}
/** A connected set of independent actions. It never owns selected state. */
declare const CuboButtonGroup: {
    new (): {
        $props: WithNativeProps<CuboButtonGroupProps>;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};

interface CuboToggleGroupItem {
    value: string;
    label: string;
    disabled?: boolean;
}
interface CuboToggleGroupProps {
    /** Controlled set of independently pressed values. An empty set is valid. */
    modelValue?: readonly string[];
    items: readonly CuboToggleGroupItem[];
    disabled?: boolean;
    /** Accessible name for the set of toggle buttons. */
    ariaLabel?: string;
    'onUpdate:modelValue'?: (value: string[]) => void;
}
/** A connected multiple-selection set of independent toggle buttons. */
declare const CuboToggleGroup: {
    new (): {
        $props: WithNativeProps<CuboToggleGroupProps>;
    };
};

type CuboTextLinkTone = "primary" | "neutral" | "inverse" | "danger" | "success" | "info";
type CuboTextLinkSize = "inherit" | "sm" | "md" | "lg";
type CuboTextLinkIconName = "arrow-right" | "arrow-left" | "external" | "plus";
declare const CUBO_TEXT_LINK_TONES: readonly CuboTextLinkTone[];
declare const CUBO_TEXT_LINK_SIZES: readonly CuboTextLinkSize[];
declare const CUBO_TEXT_LINK_ICONS: readonly CuboTextLinkIconName[];
interface CuboTextLinkProps {
    href?: string;
    target?: string;
    tone?: CuboTextLinkTone;
    size?: CuboTextLinkSize;
    underline?: boolean;
    /** Controlled visual state for lists where visited items must be explicit. */
    visited?: boolean;
    disabled?: boolean;
    leadingIcon?: CuboTextLinkIconName;
    trailingIcon?: CuboTextLinkIconName;
    ariaLabel?: string;
    onClick?: (event: MouseEvent) => void;
}
/** A text navigation link or a lightweight inline action without a container. */
declare const CuboTextLink: {
    new (): {
        $props: WithNativeProps<CuboTextLinkProps>;
    };
};

type Field = CuboCardField<VNodeChild>;
interface CuboCardProps {
    title?: CuboSlot;
    subtitle?: CuboSlot;
    media?: CuboSlot;
    actions?: CuboSlot;
    tabs?: CuboCardTab<VNodeChild>[];
    fields?: Field[];
    groups?: CuboCardGroup<VNodeChild>[];
    relations?: CuboCardRelation<VNodeChild>[];
    rightContent?: CuboSlot;
    onFieldChange?: (key: string, value: unknown) => void;
    onEntityClick?: (entity: CuboCardEntity, relation: CuboCardRelation) => void;
    onEntityDetach?: (entity: CuboCardEntity, relation: CuboCardRelation) => void;
    onEntityAttach?: (entity: CuboCardEntity, relation: CuboCardRelation) => void;
    saving?: boolean | (string | number)[];
    labelWidth?: string;
    size?: CuboSize;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    locale?: string;
}
declare const CuboCard: {
    new (): {
        $props: WithNativeProps<CuboCardProps>;
        $slots: {
            title?: () => VNodeChild;
            subtitle?: () => VNodeChild;
            media?: () => VNodeChild;
            actions?: () => VNodeChild;
            rightContent?: () => VNodeChild;
        };
    };
};

interface CuboCheckboxProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    loading?: boolean;
    color?: CuboColor;
    size?: CuboSize;
    onChange?: (value: boolean) => void;
}
declare const CuboCheckbox: {
    new (): {
        $props: WithNativeProps<CuboCheckboxProps>;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};

interface CuboConfirmProps {
    visible?: boolean;
    color?: CuboColor;
    icon?: CuboIconName;
    title?: CuboSlot;
    content?: CuboSlot;
    primaryButton?: CuboSlot;
    secondaryButton?: CuboSlot;
    primaryDisabled?: boolean;
    language?: CuboLanguage;
    teleportSelector?: string;
    onSubmit?: () => void;
    onCancel?: () => void;
    onSetVisible?: (value: boolean) => void;
}
declare const CuboConfirm: {
    new (): {
        $props: WithNativeProps<CuboConfirmProps>;
        $slots: {
            default?: () => VNodeChild;
            title?: () => VNodeChild;
            primaryButton?: () => VNodeChild;
            secondaryButton?: () => VNodeChild;
        };
    };
};

interface CuboPaginationChange {
    current: number;
    pageSize: number;
}
interface CuboPaginationProps {
    current?: number;
    total?: number;
    pageSize?: number;
    defaultPageSize?: number;
    showPageSizeSelect?: boolean;
    showArrows?: boolean;
    showIfEmpty?: boolean;
    itemsInCenter?: number;
    size?: CuboSize;
    pageSizeOptions?: number[];
    clickEvent?: 'click' | 'mousedown';
    language?: CuboLanguage;
    onChange?: (value: CuboPaginationChange) => void;
}
declare const CuboPagination: {
    new (): {
        $props: WithNativeProps<CuboPaginationProps>;
    };
};

/** The fetch context handed to `onFetch` so the consumer can refetch server-side. */
interface CuboDataFetchContext {
    filters: CuboDataFilter[];
    sort: CuboDataSort[];
    group: string | null;
    view: CuboDataViewType;
    /** The current free-text search query (debounced — see `searchDebounce`). */
    search: string;
    /** Current 1-based page — present ONLY in ungrouped table mode with pagination. */
    page?: number;
    /** Page size (rows per page) — present ONLY in ungrouped table mode with pagination. */
    limit?: number;
    /** The keys of the currently-EXPANDED groups — present ONLY when grouped. */
    expanded?: string[];
}
/** Context handed to `onSearch` — the active filters + view at search time. */
interface CuboDataSearchContext {
    filters: CuboDataFilter[];
    view: CuboDataViewType;
}
/** Context handed to a custom `card` slot / `renderCard` prop. */
interface CuboDataCardContext<R> {
    row: R;
    fields: CuboDataField[];
    /** Open this row's detail (modal/route/onRowOpen, per `detailMode`). */
    open: () => void;
}
/**
 * Context handed to a custom `renderDetail`/`detail` slot. When provided it
 * REPLACES the built-in CuboModal — render your own modal/drawer (it's mounted
 * only while the detail is open). Serves both opening an existing row
 * (`mode: 'update'`) and the "Add" flow (`mode: 'create'`).
 */
interface CuboDataDetailContext<R> {
    /** The current (editable) draft — the opened row's copy, or `{}` in create mode. */
    row: R;
    /** Whether the detail was opened to CREATE a new row or UPDATE an existing one. */
    mode: 'create' | 'update';
    /** The detail title (the opened row's display, or the create label) — your modal's header. */
    title: string;
    /** Merge a partial patch into the draft (e.g. `change({ stage: 'won' })`). */
    change: (patch: Partial<R>) => void;
    /** Close the detail. `hide(true)` closes immediately; `hide()` (default) prompts to discard when the draft is dirty. */
    hide: (force?: boolean) => void;
    /**
     * Hand back the result card and close. `mode: 'create'` → triggers `onFetch`
     * (refetch the list); `mode: 'update'` → merges `result` (or the draft) into
     * the matching row in the rendered list. Also fires `onDetailSubmit(result)`.
     */
    submit: (result?: Partial<R>) => void;
    /** Revert the draft to the row's state when the detail opened. */
    reset: () => void;
}
/**
 * Table-footer pagination — active in the UNGROUPED table view only. The
 * `component` props are forwarded to `<CuboPagination>`; its `pageSize`,
 * `current` (the controlled page) and `total` drive CuboData. A `total` makes
 * paging server-side: `CuboData` renders `rows` as-is (the current page) instead
 * of slicing locally, and `page`/`limit` flow into the URL + the `onFetch`
 * context. Changing the page or size fires `onFetch`.
 */
interface CuboDataPagination {
    /**
     * Pagination control config, passed through to `<CuboPagination>`. Holds
     * `pageSize` (@default 20), `current` (controlled page) and `total` (row count;
     * when set, paging is server-side), plus any other `CuboPaginationProps`
     * (pageSizeOptions, showPageSizeSelect, itemsInCenter, …).
     */
    component?: CuboPaginationProps;
    /** A summary node rendered in the footer, before the pagination control. */
    summary?: (ctx: {
        page: number;
        pageSize: number;
        total: number;
    }) => VNodeChild;
}
/** The `table` prop — table-view-specific configuration. */
interface CuboDataTableConfig {
    /** Clicking a row opens its detail (and the row shows a pointer cursor). @default true */
    showDetailOnRowClick?: boolean;
    /** Footer pagination (ungrouped table view only). */
    pagination?: CuboDataPagination;
    /**
     * Persist the table's column layout (order + visibility) to `localStorage`,
     * keyed by the current URL path, so it survives reloads even without URL sync.
     * On mount the saved layout seeds the columns when the URL/preset hasn't set
     * any (the URL still wins); changing columns writes through. @default true
     */
    saveColumnsStateToLocalStorage?: boolean;
}
/** Context handed to the `addButton` render function. */
interface CuboDataAddContext<R> {
    /** Open the create detail (the "Add" flow), optionally seeding the new record. */
    showDetail: (defaults?: Partial<R>) => void;
}
interface CuboDataProps<R extends Record<string, unknown> = Record<string, unknown>> {
    /** Column/field definitions. `field.format(value, row)` types `row` as `R`. */
    fields: CuboDataField<R>[];
    /** The data set. */
    rows: R[];
    /** How to derive a stable id per row. @default 'id' */
    rowKey?: CuboDataRowKey<R>;
    /** Which views the user can switch between. @default ['table','cards','pipeline'] */
    views?: CuboDataViewType[];
    /** Initial view. @default views[0] */
    defaultView?: CuboDataViewType;
    /** Visible table columns (field keys, in order). @default all field keys */
    columns?: string[];
    /** Select field that drives the kanban columns. @default first pipeline-able select */
    pipelineField?: string;
    /** Field used as a card's title. @default first 'text' field */
    cardTitleField?: string;
    /** Fields rendered in a card's body. @default first ~4 non-title fields */
    cardFields?: string[];
    /** Fully custom card body (prop form; the `card` slot is preferred when present). */
    renderCard?: (ctx: CuboDataCardContext<R>) => VNodeChild;
    /** Fully custom detail body (overrides the default <CuboCard>); the `detail` slot wins.
     *  Receives an editable `ctx` — `{ row, change, hide, submit, reset }`. */
    renderDetail?: (ctx: CuboDataDetailContext<R>) => VNodeChild;
    /** Persist a detail edit — fired by `ctx.submit()` with the current draft. */
    onDetailSubmit?: (row: R) => void;
    /** Fired when a cell's `format` ctx calls `change(patch)` (inline edit). The
     *  patch is also applied optimistically to the row in the rendered list. */
    onRowChange?: (row: R, patch: Partial<R>) => void;
    /** Activity events for the detail card's timeline pane. */
    detailTimeline?: (row: R) => CuboTimelineEvent[];
    /**
     * Controlled table-column sort. When `onSortChange` is provided the sort is
     * EXTERNAL: CuboData does NOT sort the rows (feed them pre-sorted), the header
     * indicator reflects `sort`, and clicking a header emits `onSortChange` with
     * the next state (none → asc → desc → none).
     */
    sort?: CuboDataSort | null;
    onSortChange?: (sort: CuboDataSort | null) => void;
    /** How opening a row behaves. @default 'modal' */
    detailMode?: 'modal' | 'route' | 'none';
    /** Target href/path for detailMode='route'. */
    detailRoute?: (row: R) => string;
    /** Render an "Add" control placed before the search input. Wire your button's
     *  click to `ctx.showDetail(defaults?)`, which opens the entity card in editable
     *  "creation" mode (optionally seeded with `defaults`). */
    addButton?: (ctx: CuboDataAddContext<R>) => CuboSlot;
    /** Submit handler for the creation card — receives the new record's field
     *  values. Without it the "Create" button just closes the modal. */
    onCreate?: (values: Record<string, unknown>) => void;
    /** Saved views. */
    presets?: CuboDataPreset[];
    onPresetCreate?: (preset: CuboDataPreset) => void;
    onPresetUpdate?: (preset: CuboDataPreset) => void;
    onPresetDelete?: (id: string) => void;
    /** A view was drag-reordered in the filters sidebar (the new id order). */
    onSortViews?: (orderedIds: string[]) => void;
    /**
     * Server-side filtering hook. When provided the component STOPS client-side
     * filtering/searching the `rows` (it only sorts them) — the consumer is
     * expected to fetch the matching rows and feed them back via `rows`. Fired
     * IMMEDIATELY (not debounced) whenever the filters/sort/group/view change, and
     * once on mount so initial data can load. Typing in the search box ALSO fires
     * `onFetch` (with `ctx.search`), debounced by `searchDebounce` ms — unless a
     * quick-find `onSearch` is wired, in which case the box is a command palette.
     * May return a Promise: while it's pending — and ONLY when the `loading` prop
     * is left undefined — CuboData shows its own loading overlay.
     */
    onFetch?: (ctx: CuboDataFetchContext) => void | Promise<unknown>;
    /** Debounce (ms) before a search keystroke fires `onFetch`. @default 300 */
    searchDebounce?: number;
    /**
     * Custom order of the groups / pipeline columns. Given the current fetch
     * context, return the group keys in the desired order; listed keys come first,
     * the rest keep their natural order. Applies to grouped table sections, grouped
     * cards, and the pipeline columns.
     */
    groupsOrder?: (ctx: CuboDataFetchContext) => string[];
    /** Clear all active filters (the toolbar's icon-only clear button). */
    onFiltersClear?: () => void;
    /**
     * Default filter state — an invisible baseline. Its `filters` are ALWAYS
     * applied (a floor: ANDed into client filtering and merged into the `onFetch`
     * context), but never live in the working query, so they're: ignored by the
     * clear-button counter, never written to the URL, and left in place when the
     * user clears filters (clearing returns to this default state). Use it for a
     * tenant scope, a soft-delete filter, etc. Only `filters` is consumed.
     */
    defaultFilters?: Partial<CuboDataFetchContext>;
    /**
     * Quick-find search hook. When provided, the search box becomes a command
     * palette: typing fires `onSearch(query, ctx)` (NOT `onFetch`) and the
     * dropdown shows `searchResults` (replacing the filters panel) — ↑/↓ navigate,
     * Enter / click opens the row. The consumer runs the search and feeds matches
     * back via `searchResults`, toggling `searching` while it's in flight.
     */
    onSearch?: (query: string, ctx: CuboDataSearchContext) => void;
    /** Rows matching the current search query, rendered in the results dropdown. */
    searchResults?: R[];
    /** The search request is in flight — the search box shows a spinner. */
    searching?: boolean;
    /** A card/pipeline drag moved a row across groups. */
    onCardMove?: (e: {
        row: R;
        fromKey: string;
        toKey: string;
        field?: string;
        value?: unknown;
    }) => void;
    /** Always fired when a row is opened. */
    onRowOpen?: (row: R) => void;
    /** Controlled query. */
    query?: CuboDataQuery;
    onQueryChange?: (query: CuboDataQuery) => void;
    /** Persist the query in the URL. @default true */
    urlSync?: boolean;
    /** URL search-param key for the encoded query. @default 'data' */
    urlKey?: string;
    /** Density scale. @default 'medium' */
    size?: CuboSize;
    /** Table-view-specific config (row-click behaviour + footer pagination). */
    table?: CuboDataTableConfig;
    /**
     * Show a loading overlay. Leave UNDEFINED to let CuboData manage it itself —
     * the overlay then shows whenever a Promise-returning `onFetch` is pending.
     */
    loading?: boolean;
    /** Show the search box. @default true */
    searchable?: boolean;
    /**
     * Auto-expand the filters popover when the search box gains focus. Set `false`
     * to keep focusing the search from opening the filters popup (the filter
     * button still opens it on click). @default true
     */
    showFiltersPopup?: boolean;
    /**
     * Extra toolbar content rendered right after the search box (e.g. a
     * "show deleted" checkbox, a status filter). Purely presentational — wire
     * its own state/handlers in the render function; CuboData doesn't touch it.
     */
    toolbarExtra?: () => CuboSlot;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    class?: unknown;
    style?: CSSProperties | string;
}

/**
 * `<CuboData>` — the runtime is a regular `defineComponent`; this exported
 * reference is given a generic construct signature so TSX consumers get the
 * full `CuboDataProps<R>` typing plus the native root attrs, the framework
 * emits, and the `card` / `detail` slots — all keyed by the row type `R`.
 */
declare const CuboData: {
    new <R extends Record<string, unknown> = Record<string, unknown>>(): {
        $props: WithNativeProps<CuboDataProps<R>> & {
            onQueryChange?: (query: CuboDataQuery) => void;
            onCardMove?: (e: {
                row: R;
                fromKey: string;
                toKey: string;
                field?: string;
                value?: unknown;
            }) => void;
            onRowOpen?: (row: R) => void;
            onPresetCreate?: (preset: CuboDataPreset) => void;
            onPresetUpdate?: (preset: CuboDataPreset) => void;
            onPresetDelete?: (id: string) => void;
            onSortViews?: (orderedIds: string[]) => void;
            onFetch?: (ctx: CuboDataFetchContext) => void;
            onFiltersClear?: () => void;
        };
        $slots: {
            card?: (ctx: CuboDataCardContext<R>) => VNodeChild;
            detail?: (ctx: {
                row: R;
            }) => VNodeChild;
        };
    };
};

interface CuboDrawerProps {
    container?: string;
    visible?: boolean;
    title?: CuboSlot;
    showBackground?: boolean;
    showCloseIcon?: boolean;
    closeOnBackgroundClick?: boolean;
    language?: CuboLanguage;
    onSetVisible?: (value: boolean) => void;
}
declare const CuboDrawer: {
    new (): {
        $props: WithNativeProps<CuboDrawerProps>;
        $slots: {
            default?: () => VNodeChild;
            title?: () => VNodeChild;
        };
    };
};

/** A single row in a `<CuboDropdown>` menu. */
interface CuboDropdownItem {
    /** Row content (defaults to nothing for pure dividers). */
    label?: CuboSlot;
    /** Identifier passed back through `select`. */
    value?: string | number;
    /** Leading Tabler icon. */
    icon?: CuboIconName;
    /** Leading custom content. */
    prefix?: CuboSlot;
    /** Trailing content, e.g. a `⌘K` shortcut. */
    suffix?: CuboSlot;
    /** Greyed out and non-interactive. */
    disabled?: boolean;
    /** Render a separator line instead of a row. */
    divider?: boolean;
    /** Render a non-interactive uppercase group label. */
    heading?: boolean;
    /** Red destructive styling. */
    danger?: boolean;
    /** Text matched by the `searchable` filter (defaults to a string `label`). */
    searchText?: string;
    /** Nested submenu (opens to the right). */
    children?: CuboDropdownItem[];
    /** Persist a check: toggle (`checkbox`) or one-of-group (`radio`). */
    check?: 'checkbox' | 'radio';
    /**
     * Current checked state for `check` rows.
     *
     * This is controlled by `items`: CuboDropdown never mutates it. Handle
     * `select` and pass a new/updated `items` array to persist a checkbox or
     * radio change. For radio rows the caller also keeps `radioGroup` exclusive.
     */
    checked?: boolean;
    /** Radio group id. Rows with the same group are exclusive. @default "default" */
    radioGroup?: string;
    /** Fired before `select` when an enabled leaf is activated. */
    onClick?: () => void;
}
interface CuboDropdownProps {
    /** Menu rows. */
    items: CuboDropdownItem[];
    /** The activator. @default a `<CuboButton>Menu</CuboButton>` */
    trigger?: CuboSlot;
    /** Root-menu placement relative to the trigger. @default "bottom_left" */
    position?: CuboPopupPosition;
    /** Height scale. @default "medium" */
    size?: CuboSize;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    /** Show a search box atop the root menu that filters items by label. */
    searchable?: boolean;
    /** Placeholder for the `searchable` input. @default "Search…" */
    searchPlaceholder?: string;
    /** Disable opening. */
    disabled?: boolean;
    /** Render the menu into this selector (fixed-positioned from the trigger). */
    teleportSelector?: string;
    /** Controlled open state (omit for internal state). */
    open?: boolean;
    /** Fixed/min inline size of the root menu. */
    menuWidth?: number | string;
}
/** `<CuboDropdown>` — a menu opened from a trigger (radix-style, submenus open right). */
declare const CuboDropdown: {
    new (): {
        $props: WithNativeProps<CuboDropdownProps & {
            onOpenChange?: (open: boolean) => void;
            onSelect?: (item: CuboDropdownItem) => void;
        }> & Omit<HTMLAttributes, "onSelect">;
        $slots: {
            trigger?: () => VNodeChild;
        };
    };
};

interface CuboEmptyProps {
    /** Convenience: media icon shown in the standard layout (when no default slot). */
    icon?: AllIconNameOrString;
    /** Convenience: title shown in the standard layout (when no default slot). */
    title?: CuboSlot;
    /** Convenience: muted description shown in the standard layout (when no default slot). */
    description?: CuboSlot;
    /** Convenience: actions row shown in the standard layout (when no default slot). */
    actions?: CuboSlot;
}
interface CuboEmptyMediaProps {
    /** `icon` paints a rounded tinted square around the glyph. @default "default" */
    variant?: 'icon' | 'default';
    /** Convenience icon name (rendered when no default slot is passed). */
    icon?: AllIconNameOrString;
}
declare const CuboEmptyHeader: {
    new (): {
        $slots: {
            default?: () => VNodeChild;
        };
    };
};
declare const CuboEmptyMedia: {
    new (): {
        $props: WithNativeProps<CuboEmptyMediaProps>;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};
declare const CuboEmptyTitle: {
    new (): {
        $slots: {
            default?: () => VNodeChild;
        };
    };
};
declare const CuboEmptyDescription: {
    new (): {
        $slots: {
            default?: () => VNodeChild;
        };
    };
};
declare const CuboEmptyContent: {
    new (): {
        $slots: {
            default?: () => VNodeChild;
        };
    };
};
declare const CuboEmpty: {
    new (): {
        $props: WithNativeProps<CuboEmptyProps>;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};

type ExpanderIcon = CuboIconName | {
    name: CuboIconName;
    color: CuboColor;
};
interface CuboExpanderProps {
    color?: CuboColor;
    icon?: ExpanderIcon;
    label?: CuboSlot;
    body?: CuboSlot;
    arrow?: CuboSlot;
    expandable?: boolean;
    bordered?: boolean;
    expanded?: boolean;
    onToggle?: (state: boolean) => void;
}
declare const CuboExpander: {
    new (): {
        $props: WithNativeProps<CuboExpanderProps>;
        $slots: {
            default?: () => VNodeChild;
            label?: () => VNodeChild;
        };
    };
};

type CuboIconSource = 'tabler' | 'flaticon';
type CuboIconFontProvider = {
    source: Exclude<CuboIconSource, 'tabler'>;
    fontFamily: string;
    glyphs: Readonly<Record<string, string>>;
    aliases?: Readonly<Record<string, string>>;
    classPrefix?: string;
};
type CuboIconFontResolution = {
    source: Exclude<CuboIconSource, 'tabler'>;
    name: string;
    glyph: string;
    fontFamily: string;
};
/** Register an optional local icon-font source before mounting the app. */
declare function registerCuboIconFontProvider(provider: CuboIconFontProvider): void;
declare function hasCuboIconFontProvider(source: CuboIconSource): boolean;
/** Resolve a semantic Cubo name or a provider-native name to one local glyph. */
declare function resolveCuboIconFont(source: CuboIconSource, icon: string): CuboIconFontResolution | null;

interface CuboIconProps {
    /** Semantic Cubo name or a provider-native name (any string accepted). */
    icon: AllIconNameOrString;
    /** Override the inherited icon source. @default "tabler" */
    source?: CuboIconSource;
    /** Width/height. A number is treated as px. @default 20 */
    size?: number | string;
    /** Stroke width. @default 2 */
    stroke?: number;
    /** Named colour (autocompletes) or any custom CSS colour. Overrides the inherited `currentColor`. */
    color?: CuboColor;
    /** Accessible label. When set the icon is exposed as `img`; otherwise hidden. */
    title?: string;
    /** Use the solid/filled variant (falls back to outline if none exists). @default false */
    filled?: boolean;
    /** Override the icon CDN base URL for non-curated icons (else `<CuboConfig>` / language default). */
    baseUrl?: string;
    /** Language picking the default icon CDN (else inherited from `<CuboConfig>`). */
    language?: CuboLanguage;
}
/**
 * `<CuboIcon>` renders Tabler by default and can inherit an optional local
 * icon-font provider from `<CuboConfig iconSource>`. Unknown provider names
 * safely fall back to Tabler. Native SVG attrs/listeners pass through in the
 * Tabler branch; common attrs/listeners pass through to the font wrapper.
 */
declare const CuboIcon: {
    new (): {
        $props: CuboIconProps & VNodeProps & Omit<SVGAttributes, "stroke" | "color">;
    };
};

interface CuboInlineConfirmProps {
    /**
     * Controlled open state. OMIT it to let the component manage its own
     * open/close internally (uncontrolled); `setVisible` still fires either way.
     */
    visible?: boolean;
    content?: CuboSlot;
    text?: string;
    position?: CuboPopoverPosition;
    yes_button?: string;
    no_button?: string;
    autofocus?: 'yes' | 'no' | false;
    teleportSelector?: string;
    language?: CuboLanguage;
    onSetVisible?: (value: boolean) => void;
    onSubmit?: () => void;
    onCancel?: () => void;
}
declare const CuboInlineConfirm: {
    new (): {
        $props: WithNativeProps<CuboInlineConfirmProps>;
        $slots: {
            default?: () => VNodeChild;
            content?: () => VNodeChild;
        };
    };
};

/** A single toast in the stack. */
type CuboMessage$1 = {
    id: string | number;
    type: 'success' | 'error' | 'warning' | 'info';
    text: string;
    title?: string;
};
/** Where the toast stack is pinned. */
type CuboMessagesPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';
interface CuboMessagesOptions {
    /** Auto-dismiss delay (ms). @default 3500 */
    duration?: number;
    /** Max visible toasts — oldest is dropped past this. @default 4 */
    max?: number;
}
/** Per-push override. */
interface CuboMessagesPushOptions {
    duration?: number;
}
/** The controller returned by `createCuboMessages`, read by `<CuboMessages>`. */
interface CuboMessagesController {
    /** Reactive backing store `<CuboMessages>` reads. */
    messages: Ref<CuboMessage$1[]>;
    /** Push a toast; returns its id. */
    push(message: Omit<CuboMessage$1, 'id'>, opts?: CuboMessagesPushOptions): string | number;
    success(text: string, title?: string): string | number;
    error(text: string, title?: string): string | number;
    warning(text: string, title?: string): string | number;
    info(text: string, title?: string): string | number;
    /** Remove a toast by id. */
    dismiss(id: string | number): void;
    /** Remove every toast. */
    clear(): void;
}
/**
 * `createCuboMessages` — a toast controller backed by a reactive `ref`, so
 * `<CuboMessages controller={ctrl}>` re-renders as `controller.messages` change.
 */
declare function createCuboMessages(opts?: CuboMessagesOptions): CuboMessagesController;
interface CuboMessagesProps {
    /** The controller created with `createCuboMessages`. */
    controller: CuboMessagesController;
    /** Stack corner/edge. @default "top-right" */
    position?: CuboMessagesPosition;
    /** Render the stack into this selector. */
    teleportSelector?: string;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
}
/** `<CuboMessages>` — renders a controller's toast stack into a fixed corner. */
declare const CuboMessages: {
    new (): {
        $props: WithNativeProps<CuboMessagesProps>;
    };
};

interface CuboModalProps {
    visible?: boolean;
    loading?: boolean;
    closeOnEscapePress?: boolean;
    closeOnBackgroundClick?: boolean;
    showCloseIcon?: boolean;
    top?: boolean;
    wrapAttrs?: Record<string, unknown>;
    teleportSelector?: string;
    language?: CuboLanguage;
    header?: CuboSlot;
    content?: CuboSlot;
    footer?: CuboSlot;
    onSetVisible?: (value: boolean) => void;
}
declare const CuboModal: {
    new (): {
        $props: WithNativeProps<CuboModalProps>;
        $slots: {
            default?: () => VNodeChild;
            header?: () => VNodeChild;
            footer?: () => VNodeChild;
        };
    };
};

/** Visual feedback state for the OTP field. */
type CuboOtpState = 'default' | 'success' | 'error' | 'loading';
interface CuboOtpProps {
    /** Number of single-char boxes. @default 6 */
    length?: number;
    /** Controlled value — the concatenated code (length ≤ `length`). */
    value?: string;
    /**
     * Regex *source* matching a single allowed char (the native `pattern` attr is
     * derived from this too). @default "[0-9]"
     */
    pattern?: string;
    /** Virtual-keyboard hint for each box. @default "numeric" */
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /** Visual feedback state; `loading` also disables + shows a spinner. @default "default" */
    state?: CuboOtpState;
    /** Disable every box. */
    disabled?: boolean;
    /** Focus the first box on mount. */
    autoFocus?: boolean;
    /** Render the entered chars as dots (password style). */
    mask?: boolean;
    /** Height scale. @default "medium" */
    size?: CuboSize;
    /** Accessible group label. @default "One-time code" */
    ariaLabel?: string;
}
/**
 * `<CuboOtp>` — a one-time-code input: a row of single-char boxes with
 * auto-advance, smart backspace, arrow navigation, and paste distribution.
 * (construct-signature overlay gives TSX consumers the typed props + emits.)
 */
declare const CuboOtp: {
    new (): {
        $props: WithNativeProps<CuboOtpProps & {
            onChange?: (value: string) => void;
            onComplete?: (value: string) => void;
        }>;
    };
};

interface CuboPopupProps {
    visible?: boolean;
    content?: CuboSlot;
    text?: CuboSlot;
    position?: CuboPopupPosition;
    disabled?: boolean;
    teleportSelector?: string;
    onSetVisible?: (value: boolean) => void;
}
declare const CuboPopup: {
    new (): {
        $props: WithNativeProps<CuboPopupProps>;
        $slots: {
            default?: () => VNodeChild;
            content?: () => VNodeChild;
        };
    };
};

/** A single command/result row in a `<CuboSearch>`. */
interface CuboSearchItem {
    /** Visible primary text (and the main field matched while filtering). */
    label: string;
    /**
     * Rich row content rendered in place of `label` (which is still used for
     * filtering and accessibility). Lets a result row carry highlighted matches,
     * secondary lines, etc.
     */
    content?: CuboSlot;
    /** Stable identity for the row. */
    value: string | number;
    /** Optional leading icon. */
    icon?: CuboIconName;
    /** Trailing slot, typically a keyboard shortcut hint. */
    suffix?: CuboSlot;
    /** Optional group heading this row belongs to. */
    group?: string;
    /** Non-selectable, dimmed row. */
    disabled?: boolean;
    /** Extra terms matched while filtering (never shown). */
    keywords?: string[];
    /** Fired when this row is committed (before the list-level select). */
    onSelect?: () => void;
}
interface CuboSearchProps {
    /** All rows; filtered in place as the query changes. */
    items: CuboSearchItem[];
    /** Search input placeholder. @default "Search…" */
    placeholder?: string;
    /** Controlled query. Omit for an internally managed query. */
    value?: string;
    /** Shown centred when filtering yields no rows. @default "No results found." */
    emptyText?: string;
    /** Replace the result list with a centred spinner. */
    loading?: boolean;
    /** Height scale (input height + paddings). @default "medium" */
    size?: CuboSize;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    /** Focus the search input on mount. */
    autoFocus?: boolean;
    /**
     * Override the built-in label+keywords substring filter. May be **async** —
     * return a `Promise<CuboSearchItem[]>` to resolve results from a server or any
     * custom matcher; previous results stay visible until it settles, a spinner
     * shows only if it takes >150ms, and a stale resolution is ignored. A changed
     * `filterFn` re-runs the filter, so pass a stable (memoised / module-level)
     * reference to avoid re-running on every render. Pass `null` to disable
     * filtering entirely (results are filtered upstream).
     */
    filterFn?: ((query: string, items: CuboSearchItem[]) => CuboSearchItem[] | Promise<CuboSearchItem[]>) | null;
    /** Render as a fullscreen command palette over a lightly blurred backdrop. */
    fullscreen?: boolean;
    /** Controlled open state of the fullscreen palette (omit for internal state). */
    open?: boolean;
    /** Bind a global open/close hotkey while `fullscreen`. `true` ⇒ ⌘K/Ctrl+K. @default true */
    hotkey?: boolean | string;
    /** Portal target for the fullscreen overlay. */
    teleportSelector?: string;
}
/** `<CuboSearch>` — an inline command palette (construct-signature overlay). */
declare const CuboSearch: {
    new (): {
        $props: WithNativeProps<CuboSearchProps & {
            onChange?: (query: string) => void;
            onSelect?: (item: CuboSearchItem) => void;
            onOpenChange?: (open: boolean) => void;
            onHighlightChange?: (item: CuboSearchItem | null) => void;
        }>;
    };
};

type CuboSelectVariantsProps<T extends CuboSelectValue = CuboSelectValue> = CuboSelectVariantsBaseProps<T> & {
    /** Built-in-string language (threaded from `<CuboSelect>`). @default "en" */
    language?: CuboLanguage;
    /** A row should become the highlighted one (pointer moved over it). */
    onHighlight?: (index: number) => void;
    /** An enabled option row was committed. */
    onSelect?: (variant: CuboSelectVariant<T>) => void;
    /** The tri-state select-all row was committed; receives the next values. */
    onSelectAll?: (values: T[]) => void;
    /** The list scrolled near its end — a hook for async "load more". */
    onLoadMore?: () => void;
};
/**
 * `<CuboSelectVariants>` — the standalone variants/options box of CuboSelect:
 * option rows (checkbox rows in `multiple` mode), the tri-state select-all
 * row, empty + loading states. CuboSelect composes it inside its teleported
 * panel, but it renders fine on its own (construct-signature overlay).
 */
declare const CuboSelectVariants: {
    new <T extends CuboSelectValue = CuboSelectValue>(): {
        $props: CuboSelectVariantsProps<T> & Omit<HTMLAttributes, "onSelect">;
        $slots: {
            variant?: (ctx: {
                variant: CuboSelectVariant<T>;
            }) => VNodeChild;
        };
    };
};

/** Vue-only custom-dropdown props — forbidden when `native` (mirrors React). */
type CuboSelectVueCustomProps = {
    language?: CuboLanguage;
    onSetOpened?: (opened: boolean) => void;
    onSearch?: (query: string) => void;
    onLoadMore?: () => void;
};
/**
 * `<CuboSelect>` — generic single/multi select (construct-signature overlay).
 * The `$props` type is a discriminated union on `native`: the custom-dropdown
 * props (core `CuboSelectCustomProps` + `language`/`onSetOpened`/`onSearch`) are
 * available when `native` is false/unset, and a TYPE ERROR when `native` is true.
 */
declare const CuboSelect: {
    new <M extends boolean = false, T extends CuboSelectValue = CuboSelectValue>(): {
        $props: CuboSelectBaseProps<M, T> & {
            onChange?: (value: (M extends true ? T[] : T) | undefined, variants: (M extends true ? CuboSelectVariant<T>[] : CuboSelectVariant<T>) | undefined) => void;
        } & Omit<HTMLAttributes, "onChange"> & (({
            native?: false;
        } & CuboSelectCustomProps<T> & CuboSelectVueCustomProps) | ({
            native: true;
        } & CuboSelectForbidden<CuboSelectCustomProps<T> & CuboSelectVueCustomProps>));
        $slots: {
            value?: (ctx: {
                selected: any;
            }) => VNodeChild;
            variant?: (ctx: {
                variant: CuboSelectVariant<T>;
            }) => VNodeChild;
        };
    };
};

type CuboSortableProps<T> = {
    rows: T[];
    horizontal?: boolean;
    disabled?: boolean;
    /** CSS selector for a drag handle within each item (drag starts only there). */
    handler?: string;
    /** Alias of `handler` (kept for compatibility). */
    handle?: string;
    /**
     * Shared key enabling drag BETWEEN lists: items can be dragged from one
     * `<CuboSortable group="x">` into another with the same `group`. The receiving
     * list emits `add`; reordering within a list still emits `change`.
     */
    group?: string;
    /** Logical name of this list, surfaced as `from`/`to` in the add context. */
    name?: string;
    renderItem?: (row: T, index: number) => VNodeChild;
    /**
     * Content for the empty drop zone shown when a `group` list has no rows (so a
     * row can still be dragged in). Defaults to a blank dashed area; a `placeholder`
     * slot works too.
     */
    placeholder?: VNodeChild;
    onChange?: (rows: T[]) => void;
    /** Emitted on the RECEIVING list when a row is dragged in from a `group` sibling. */
    onAdd?: (ctx: CuboSortableAddContext<T & CuboSortableItem>) => void;
};
/** `<CuboSortable>` — a drag-to-reorder list (construct-signature overlay for T). */
declare const CuboSortable: {
    new <T extends CuboSortableItem>(): {
        $props: CuboSortableProps<T> & Omit<HTMLAttributes, "onChange">;
    };
};

interface CuboSpinnerProps {
    size?: number | string;
    stroke?: number;
    color?: CuboColor;
    label?: string;
}
declare const CuboSpinner: {
    new (): {
        $props: WithNativeProps<CuboSpinnerProps>;
    };
};

interface CuboSwitchProps {
    value?: boolean;
    disabled?: boolean;
    loading?: boolean;
    color?: CuboColor;
    size?: CuboSize;
    thumbIcon?: CuboIconName;
    onChange?: (value: boolean) => void;
}
declare const CuboSwitch: {
    new (): {
        $props: WithNativeProps<CuboSwitchProps>;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};

interface CuboRadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface CuboRadioProps {
    value: string;
    options: readonly CuboRadioOption[];
    name?: string;
    size?: CuboSize;
    disabled?: boolean;
    vertical?: boolean;
    ariaLabel: string;
    onChange?: (value: string) => void;
}
/** `<CuboRadio>` — one native radio group with explicit arrow-key navigation. */
declare const CuboRadio: vue.DefineComponent<vue.ExtractPropTypes<{
    value: {
        type: StringConstructor;
        required: true;
    };
    options: {
        type: PropType<readonly CuboRadioOption[]>;
        required: true;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: PropType<CuboSize>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    ariaLabel: {
        type: StringConstructor;
        required: true;
    };
}>, () => JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    change: (_value: string) => true;
}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    value: {
        type: StringConstructor;
        required: true;
    };
    options: {
        type: PropType<readonly CuboRadioOption[]>;
        required: true;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: PropType<CuboSize>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    ariaLabel: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{
    onChange?: ((_value: string) => any) | undefined;
}>, {
    disabled: boolean;
    size: CuboSize;
    name: string;
    vertical: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

interface CuboTableColumn<T = any> {
    key: string;
    label?: string;
    sortable?: boolean;
    sortKey?: string;
    sortActive?: "asc" | "desc";
    align?: "left" | "center" | "right";
    width?: string;
    headCell?: (column: CuboTableColumn<T>) => VNodeChild;
    bodyCell?: (row: T, index: number) => VNodeChild;
    footCell?: (totals: unknown) => VNodeChild;
}
interface CuboTableProps<T> {
    rows: T[];
    columns: CuboTableColumn<T>[];
    totals?: unknown;
    hoverable?: boolean;
    stickyHeader?: boolean;
    size?: CuboSize;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    emptyText?: string;
    draggable?: boolean;
    rowClickEvent?: "click" | "mousedown";
    onRowClick?: (ctx: {
        row: T;
        index: number;
    }) => void;
    onColumnClick?: (ctx: {
        row: T;
        column: CuboTableColumn<T>;
        index: number;
    }) => void;
    onSetSort?: (ctx: {
        key: string;
        direction: "asc" | "desc";
    }) => void;
    onSort?: (rows: T[]) => void;
    rowAttributes?: ({ row, index, extra, emit, }: {
        row: T;
        index: number;
        extra?: any;
        emit?: any;
    }) => HTMLAttributes;
}
/** `<CuboTable>` — flex-grid table with sortable headers + optional row drag. */
declare const CuboTable: {
    new <T extends Record<string, any>>(): {
        $props: CuboTableProps<T> & HTMLAttributes;
    };
};

type CuboTabsFormat = "line" | "pill" | "segmented";
/** Pre-24.08 names, still accepted: `sliding` = line, `soft` = pill + tonal. */
type CuboTabsLegacyFormat = "sliding" | "soft";
type CuboTabsTone = "primary" | "neutral" | "tonal";
type CuboTabsShape = "rounded" | "pill";
type CuboTabsSize = "small" | "medium" | "large";
type CuboTabsItem<T = string | number> = {
    id?: T;
    label?: CuboSlot;
    content?: CuboSlot;
    is_split?: boolean;
    badge?: string | {
        color?: CuboColor;
        text: string;
    };
    /** Leading Tabler icon. */
    icon?: CuboIconName;
    /** Trailing Tabler icon. */
    iconAfter?: CuboIconName;
    /** Accessible name override for icon-only tabs with a non-text label. */
    ariaLabel?: string;
    /** This tab alone cannot be selected. */
    disabled?: boolean;
} & Record<string, any>;
/** Context passed to `renderItem` for rendering a custom tab element. */
interface CuboTabsItemContext<T> {
    /** The tab being rendered. */
    tab: CuboTabsItem<T>;
    /** Standard tab attributes (id, role, aria-*, class, data-active) — spread onto your element. */
    attrs: HTMLAttributes;
    /** Selects the tab on click — present when `trigger` is `"click"` (the default). */
    onClick?: (e: MouseEvent) => void;
    /** Selects the tab on mousedown — present when `trigger` is `"mousedown"`. */
    onMousedown?: (e: MouseEvent) => void;
}
interface CuboTabsProps<T = string | number> {
    tabs: CuboTabsItem<T>[];
    active?: T;
    vertical?: boolean;
    /**
     * Shape of the strip. `"line"` (default) — an underline that glides between
     * tabs; `"pill"` — a plate behind the active tab; `"segmented"` — a filled
     * track with a raised active segment. Legacy `"sliding"` / `"soft"` map to
     * line / pill+tonal. @default "line"
     */
    format?: CuboTabsFormat | CuboTabsLegacyFormat;
    /**
     * Colour of the active tab. `"primary"` — brand; `"neutral"` — ink;
     * `"tonal"` — brand text on a light brand tint and is available only for
     * `pill`. Segmented defaults to neutral. @default format-dependent
     */
    tone?: CuboTabsTone;
    /** Active plate radius. Line is always rounded; Pill defaults to pill-shaped; Segmented defaults to rounded. @default format-dependent */
    shape?: CuboTabsShape;
    /** Explicit 28 / 32 / 40 px size; without it the ambient `[data-gtc-size]` container decides. */
    size?: CuboTabsSize;
    /** Disables the whole strip while preserving the selected geometry. @default false */
    disabled?: boolean;
    activeFirst?: boolean;
    emitSameChanged?: boolean;
    /** Shows one icon per tab in a square control while keeping the label accessible. */
    iconOnly?: boolean;
    expandLabel?: boolean;
    trigger?: "click" | "mousedown";
    /** Render a custom element per tab instead of the default button. Spread `ctx.attrs` and bind `ctx.onClick`/`ctx.onMousedown` onto your element. */
    renderItem?: (ctx: CuboTabsItemContext<T>) => CuboSlot;
    /** Content rendered at the start of the tab strip, before the tabs. */
    beforeTabs?: CuboSlot;
    /** Content rendered at the end of the tab strip, after the tabs. */
    afterTabs?: CuboSlot;
    onChange?: (val: T) => void;
}
/** `<CuboTabs>` — tab bar in line / pill / segmented formats (construct-signature overlay for T). */
declare const CuboTabs: {
    new <T = string | number>(): {
        $props: CuboTabsProps<T> & Omit<HTMLAttributes, "onChange">;
    };
};

/**
 * Public props for `<CuboText>`, generic over the html type.
 *
 * Use an explicit type argument in TSX to bind the value type:
 * ```tsx
 * <CuboText<'number'> value={qty} onChange={(n) => (qty = n)} />  // n: number | null
 * <CuboText value={name} onChange={(s) => (name = s)} />          // s: string
 * ```
 */
interface CuboTextProps<T extends CuboInputType = "text"> {
    htmlType?: T;
    value?: CuboTextValue<T>;
    placeholder?: string;
    size?: CuboSize;
    state?: CuboState;
    readonly?: boolean;
    disabled?: boolean;
    loading?: boolean;
    autofocus?: boolean;
    /** Prefix text. For a custom node use the `#prefix` slot; for an icon use `prefixIcon`. */
    prefix?: string;
    /** Suffix text. For a custom node use the `#suffix` slot; for an icon use `suffixIcon`. */
    suffix?: string;
    prefixIcon?: IconNameOrString;
    suffixIcon?: IconNameOrString;
    htmlAttrs?: InputHTMLAttributes;
    /** Fires with the typed value whenever it changes. */
    onChange?: (value: CuboTextValue<T>) => void;
    onKeyup?: (event: KeyboardEvent) => void;
    onKeydown?: (event: KeyboardEvent) => void;
    onKeypress?: (event: KeyboardEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onEnter?: (event: KeyboardEvent) => void;
    onEscape?: (event: KeyboardEvent) => void;
}
/**
 * `<CuboText>` — the Cubo text input for Vue.
 *
 * The runtime is a regular `defineComponent`; this exported reference is given a
 * generic construct signature so TSX consumers get `value` / `onChange` typed by
 * `htmlType` (`number` ⇒ `number | null`, otherwise `string`).
 */
declare const CuboText: {
    new <T extends CuboInputType = "text">(): {
        $props: CuboTextProps<T> & Omit<HTMLAttributes, "onChange">;
        $slots: {
            prefix?: () => unknown;
            suffix?: () => unknown;
        };
    };
};

interface CuboTextareaProps {
    value?: string;
    placeholder?: string;
    size?: CuboSize;
    state?: CuboState;
    readonly?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    autosize?: boolean;
    resizable?: boolean;
    rows?: number;
    htmlAttrs?: Record<string, unknown>;
    /** Fires with the new value whenever it changes. */
    onChange?: (value: string) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onKeydown?: (event: KeyboardEvent) => void;
    onEnter?: (event: KeyboardEvent) => void;
    onEscape?: (event: KeyboardEvent) => void;
}
declare const CuboTextarea: {
    new (): {
        $props: WithNativeProps<CuboTextareaProps>;
    };
};

interface CuboAvatarProps {
    user?: CuboEventUser;
    /** Pixel diameter. @default 28 */
    size?: number;
    className?: string;
}
declare const CuboAvatar: {
    new (): {
        $props: WithNativeProps<CuboAvatarProps>;
    };
};

interface CuboTimelineProps {
    /** The events to render (any order; grouped + sorted by day internally). */
    events: CuboTimelineEvent[];
    /** People available for assignment / `@`-mention selectors, and for resolving
     *  `@name` mentions highlighted in event text. */
    users?: CuboEventUser[];
    /** Ids of users following this entity. `undefined` (not `[]`) disables the
     *  feature — no followers row. Otherwise the message box shows the follower
     *  avatar stack; `@`-mentioning someone subscribes them once the message/task
     *  is posted (via `onFollowersChange`). */
    followers?: (string | number)[];
    /** The entity owner — always pinned first in the followers list and locked
     *  (can't be removed) in the followers picker. */
    ownerId?: string | number;
    /** The followers list changed (picker toggle, or a mention subscribe on post). */
    onFollowersChange?: (ids: (string | number)[]) => void;
    /** Consumer-defined event types — each gets a "+ create" button (when it has
     *  `fields`) and its `render` takes precedence over the built-in card. */
    eventTypes?: CuboTimelineEventType<CuboTimelineEvent, VNodeChild>[];
    /** The signed-in user (reserved for future "you" treatment). */
    currentUser?: CuboEventUser;
    /** Group events under sticky day separators. @default true */
    groupByDay?: boolean;
    /** Loading the older page — shows a spinner at the top. */
    loading?: boolean;
    /** More older events exist (arms the top load sentinel). */
    hasMore?: boolean;
    /** Fired when the top sentinel scrolls into view. */
    onLoadMore?: () => void;
    /** Show the bottom composer. @default true */
    composer?: boolean;
    /** A new message/task was posted from the composer. */
    onCreateEvent?: (draft: CuboTimelineDraft) => void;
    /** A task was completed or reopened. `done` is the new state; `result` is the
     *  chosen outcome value (only when the task offers `resultOptions`). */
    onTaskComplete?: (event: CuboTaskEvent, done: boolean, result?: string) => void;
    /** An event row was clicked. */
    onEventClick?: (event: CuboTimelineEvent) => void;
    /** An attachment chip was clicked. */
    onAttachmentClick?: (att: CuboEventAttachment) => void;
    /** Full custom override for an event row. */
    renderEvent?: (event: CuboTimelineEvent) => CuboSlot;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    /** Text shown when there are no events. @default "No activity yet" */
    emptyText?: string;
    /** Density scale (forwarded to the composer). @default "medium" */
    size?: CuboSize;
    /** BCP-47 locale for dates/times. */
    locale?: string;
}
declare const CuboTimeline: {
    new (): {
        $props: WithNativeProps<CuboTimelineProps>;
        $slots: {
            event?: (ctx: {
                event: CuboTimelineEvent;
            }) => VNodeChild;
        };
    };
};

interface CuboTooltipProps {
    content?: CuboSlot;
    color?: CuboColor;
    position?: CuboPopupPosition;
    teleportSelector?: string;
}
declare const CuboTooltip: {
    new (): {
        $props: WithNativeProps<CuboTooltipProps>;
        $slots: {
            default?: () => VNodeChild;
            content?: () => VNodeChild;
        };
    };
};

interface CuboCalendarCellContext extends CuboCalendarCell {
    selected: boolean;
    disabled: boolean;
    inRange: boolean;
}

interface CuboCalendarProps<T extends CuboCalendarType = 'single'> {
    type?: T;
    value?: CuboCalendarValue<T>;
    timeZone?: string;
    locale?: string;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    weekStartsOn?: number;
    disabledDate?: (date: Date) => boolean;
    time?: boolean;
    /** Render two months side by side (current + next) — handy for ranges. */
    dual?: boolean;
    presets?: CuboCalendarPreset<T>[];
    renderCell?: (ctx: CuboCalendarCellContext) => VNodeChild;
}
declare const CuboCalendar: {
    new <T extends CuboCalendarType = "single">(): {
        $props: CuboCalendarProps<T> & {
            onChange?: (value: CuboCalendarValue<T>) => void;
        } & Omit<HTMLAttributes, "onChange">;
    };
};

interface CuboColorPickerProps {
    /** Controlled colour (hex). @default "#000000" */
    value?: string;
    /** Preset swatches shown under the picker. */
    swatches?: string[];
    /** Render the panel inline instead of behind a trigger swatch. @default false */
    inline?: boolean;
    /** Size of the trigger. @default "medium" */
    size?: CuboSize;
    disabled?: boolean;
    /** Panel placement when not inline. @default "bottom_left" */
    position?: CuboPopupPosition;
    teleportSelector?: string;
}
/** `<CuboColorPicker>` — an HSV colour picker (saturation/value area + hue slider + hex). */
declare const CuboColorPicker: {
    new (): {
        $props: CuboColorPickerProps & {
            onChange?: (hex: string) => void;
        } & Omit<HTMLAttributes, "onChange">;
    };
};

/** Inherited defaults supplied (reactively) to nested Cubo components. */
interface CuboConfigContext {
    language: ComputedRef<CuboLanguage>;
    iconBaseUrl: ComputedRef<string | undefined>;
    iconSource: ComputedRef<CuboIconSource>;
    background: ComputedRef<string | undefined>;
}
interface CuboConfigProps {
    /** Default language for every nested component (unless one sets its own). */
    language?: CuboLanguage;
    /**
     * Base URL for CDN-served (non-curated) icons, e.g. `https://static.cubo.sh`.
     * Defaults to the per-language CDN (`ru → cuboapp.ru`, `en → cubo.sh`).
     */
    iconBaseUrl?: string;
    /** Default icon source for nested CuboIcon instances. @default "tabler" */
    iconSource?: CuboIconSource;
    /**
     * Default surface background for nested input/surface components (CuboText,
     * CuboSelect, CuboCheckbox, CuboTable, CuboDrawer, CuboModal) — any CSS colour
     * or `var(--…)`. Defaults to `var(--c-color-bg)`.
     */
    background?: string;
}
declare const CuboConfig: {
    new (): {
        $props: CuboConfigProps;
        $slots: {
            default?: () => VNodeChild;
        };
    };
};
/**
 * Resolve the effective language for a component as a computed: an explicit
 * `language` prop wins, else the inherited `<CuboConfig>` value, else the kit
 * default (`en`). Pass a getter so the prop stays reactive, e.g.
 * `const language = useCuboLanguage(() => props.language)`.
 */
declare function useCuboLanguage(getOverride?: () => CuboLanguage | undefined): ComputedRef<CuboLanguage>;
/**
 * Resolve the effective icon CDN base URL as a computed: an explicit `baseUrl`
 * getter wins, else the inherited `<CuboConfig iconBaseUrl>`, else the per-language
 * default CDN. Pass getters so props stay reactive.
 */
declare function useCuboIconBaseUrl(getOverride?: () => string | undefined, getLanguage?: () => CuboLanguage | undefined): ComputedRef<string>;
/** Resolve the selected icon source: explicit prop, inherited CuboConfig, then Tabler. */
declare function useCuboIconSource(getOverride?: () => CuboIconSource | undefined): ComputedRef<CuboIconSource>;
/**
 * Resolve the effective surface background as a computed: an explicit `override`
 * getter wins, else the inherited `<CuboConfig background>` / global
 * `cuboSetConfig`, else `undefined` (the SCSS then falls back to
 * `var(--c-color-bg)`). Apply the result as `--cubo-config-bg` on the root.
 */
declare function useCuboBackground(getOverride?: () => string | undefined): ComputedRef<string | undefined>;

interface CuboDatePickerProps<T extends CuboCalendarType = 'single'> {
    type?: T;
    value?: CuboCalendarValue<T>;
    format?: string;
    timeZone?: string;
    locale?: string;
    weekStartsOn?: number;
    disabledDate?: (date: Date) => boolean;
    time?: boolean;
    /** Show two months side by side in the popup calendar. */
    dual?: boolean;
    presets?: CuboCalendarPreset<T>[];
    renderCell?: (ctx: CuboCalendarCellContext) => VNodeChild;
    placeholder?: string;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    size?: CuboSize;
    disabled?: boolean;
    clearable?: boolean;
    position?: CuboPopupPosition;
    teleportSelector?: string;
    /** id(s) naming the date input (forwarded as `aria-labelledby`). */
    ariaLabelledby?: string;
    /** Mark the date input as required for assistive tech. @default false */
    ariaRequired?: boolean;
}
declare const CuboDatePicker: {
    new <T extends CuboCalendarType = "single">(): {
        $props: CuboDatePickerProps<T> & {
            onChange?: (value: CuboCalendarValue<T>) => void;
        } & Omit<HTMLAttributes, "onChange">;
    };
};

interface CuboEventsBoxProps {
    /** The notifications to render (fully controlled — never mutated). */
    notifications: CuboNotification[];
    /** Drawer open state. */
    visible: boolean;
    /** Asked to change `visible` (close button, backdrop, Escape). */
    onSetVisible: (value: boolean) => void;
    /** Drawer header title. @default the built-in "Notifications" for `language` */
    title?: string;
    /** Built-in-string language (overrides `<CuboConfig language>`). @default "en" */
    language?: CuboLanguage;
    /** BCP-47 locale for the day separators ("Today"/"Сегодня"). */
    locale?: string;
    /** Loading the next page — shows a bottom spinner. */
    loading?: boolean;
    /** More notifications exist (arms the bottom load sentinel). */
    hasMore?: boolean;
    /** Fired when the bottom sentinel scrolls into view. */
    onLoadMore?: () => void;
    /** "Read all" was clicked. */
    onReadAll?: () => void;
    /** A single notification should be marked read (on open/click). */
    onRead?: (n: CuboNotification) => void;
    /** A notification row was clicked. */
    onNotificationClick?: (n: CuboNotification) => void;
    /** Group items under day separators (reusing the timeline classes). @default true */
    groupByDay?: boolean;
    /** Full custom override for a notification row. */
    renderNotification?: (n: CuboNotification) => CuboSlot;
    /** Text shown when a tab has no items. */
    emptyText?: string;
    /** Density scale. @default "medium" */
    size?: CuboSize;
}
declare const CuboEventsBox: {
    new (): {
        $props: CuboEventsBoxProps & {
            class?: unknown;
            style?: unknown;
        };
        $slots: {
            notification?: (ctx: {
                notification: CuboNotification;
            }) => VNodeChild;
        };
    };
};

type CuboDataViewListFiltersDrawerProps<F> = {
    header?: {
        title?: string;
        buttons?: {
            submit?: string;
            cancel?: string;
        };
    };
    fields?: CuboDataViewFilter[];
    query?: CuboDataViewListFiltersQuery<F>;
};

type CuboDataViewListFiltersQuery<F> = {
    search?: string;
    page?: number;
    limit?: number;
    [key: string]: any;
} & Partial<Record<never, F>>;
type CuboDataViewListFiltersProps<F> = {
    query?: CuboDataViewListFiltersQuery<F>;
    storage?: "query";
    fields?: CuboDataViewFilter[];
    defaults?: CuboDataViewListFiltersQuery<F>;
    clearButton?: string;
    filterButton?: string;
    drawerOptions?: CuboDataViewListFiltersDrawerProps<F>;
};

type CuboDataViewListHeaderSearchProps = {
    debounceTimeout?: number;
    placeholder?: string;
    query: string;
};

type CuboDataViewListHeaderSlotContext<T, F> = {
    query: F;
    changeQuery: (opts: CuboDataViewListFiltersQuery<F>) => void;
    add: (opts?: Partial<T>) => void;
};
type CuboDataViewListHeaderProps<T, F> = {
    totals?: CuboDataViewListTotals;
    filters?: Omit<CuboDataViewListFiltersProps<F>, 'query'>;
    query?: CuboDataViewListFiltersQuery<F>;
    create?: {
        allowed?: boolean;
        buttonName?: string;
        buttonProps?: CuboButtonProps;
    };
    pagination?: any | false;
    search?: Omit<CuboDataViewListHeaderSearchProps, 'query'>;
    slotActions?: (ctx: CuboDataViewListHeaderSlotContext<T, F>) => JSX$1.Element;
    slotAfterActions?: (ctx: CuboDataViewListHeaderSlotContext<T, F>) => JSX$1.Element;
    slotAfterSearch?: (ctx: CuboDataViewListHeaderSlotContext<T, F>) => JSX$1.Element;
    slotAfterFilters?: (ctx: CuboDataViewListHeaderSlotContext<T, F>) => JSX$1.Element;
    slotAfterPagination?: (ctx: CuboDataViewListHeaderSlotContext<T, F>) => JSX$1.Element;
};

type CuboDataViewModel<T> = {
    id?: number | string;
} & Record<keyof T, any>;
type CuboDataViewFilter = {
    type: "text" | "number" | "select" | "multiselect" | "checkbox" | "number_range" | "date_range";
    key: string;
    condition?: "eq" | "ex" | "like" | "ilike" | "in" | "nin" | "gt" | "lt" | "gte" | "lte" | null;
    label?: string;
    defaultValue?: any;
    hidden?: boolean;
    textOptions?: CuboTextProps;
    numberOptions?: CuboTextProps;
    selectOptions?: CuboSelectProps;
    multiselectOptions?: CuboSelectProps;
    checkboxOptions?: any;
};
type CuboDataViewQueries<T, F> = {
    getMany?: (opts?: CuboDataViewListFiltersQuery<F>) => Promise<{
        rows: T[];
        totals: CuboDataViewListTotals;
    }>;
    getOne?: (opts?: CuboDataViewListFiltersQuery<F>) => Promise<T | undefined>;
    updateOne?: (opts: CuboDataViewListFiltersQuery<F>, form: T) => Promise<T | undefined>;
    createOne?: (form: T) => Promise<T | undefined>;
    removeOne?: (opts?: CuboDataViewListFiltersQuery<F>) => Promise<void>;
};
type CuboDataViewListTotals = {
    count: number;
};
type CuboDataViewCardRights = {
    create?: boolean;
    update?: boolean;
    remove?: boolean;
};
type CuboDataViewCardLoaders = {
    saving?: boolean;
    removing?: boolean;
};
type CuboDataViewCardButtons<T> = {
    submit?: string | ((card: T) => string);
    cancel?: string | ((card: T) => string);
    remove?: {
        button?: string | ((card: T) => string);
        cancel?: string | ((card: T) => string);
        submit?: string | ((card: T) => string);
        text?: string | ((card: T) => string);
    };
};

type CuboUiEntityTableCardHeaderProps<T> = {
    card: T;
    editable?: boolean;
    removable?: boolean;
    title?: (card: T) => string | JSX$1.Element;
    loaders?: CuboDataViewCardLoaders;
    buttons?: CuboDataViewCardButtons<T>;
    teleportSelector?: string;
};

type CuboDataViewCardFormLineProps = {
    label: string | JSX$1.Element;
    value: JSX$1.Element;
};
type CuboDataViewCardFormLineEmits = {};
declare const CuboDataViewCardFormLine: vue.DefineSetupFnComponent<CuboDataViewCardFormLineProps, CuboDataViewCardFormLineEmits, {}, CuboDataViewCardFormLineProps & {}, vue.PublicProps>;

type CuboDataViewCardComponentContext<T> = {
    editable: boolean;
    card: T;
    submit: CuboDataViewCardEmits<T>["submit"];
    change: CuboDataViewCardEmits<T>["change"];
    remove: CuboDataViewCardEmits<T>["remove"];
    hide: CuboDataViewCardEmits<T>["hide"];
    fetch: CuboDataViewCardEmits<T>["fetch"];
    emitChange: (opts: Partial<T>) => void;
    emitRemove: () => void;
};
type CuboDataViewCardProps<T, F> = {
    card: T;
    component: (ctx: CuboDataViewCardComponentContext<T>) => JSX$1.Element;
    initialProps?: Partial<T> & Record<string, any>;
    type?: "modal" | "page";
    header?: Omit<CuboUiEntityTableCardHeaderProps<T>, "card">;
    rights?: CuboDataViewCardRights;
    loaders?: CuboDataViewCardLoaders;
    buttons?: CuboDataViewCardButtons<T>;
    queries?: CuboDataViewQueries<T, F>;
    modalProps?: any;
    autoOpenByQuery?: boolean;
    hooks?: {
        beforeSubmit?: (card: T) => void | Promise<void>;
        afterSubmit?: (card: T, result: T | undefined) => void | Promise<void>;
        beforeRemove?: (card: T) => void | Promise<void>;
        afterRemove?: (card: T) => void | Promise<void>;
    };
    messages?: {
        create?: {
            success?: string;
            error?: (error: any) => string;
        };
        update?: {
            success?: string;
            error?: (error: any) => string;
        };
        delete?: {
            success?: string;
            error?: (error: any) => string;
        };
    };
};
type CuboDataViewCardEmits<T> = {
    change: (data: Partial<T>, opts?: {
        silent?: boolean;
    }) => void;
    submit: (opts?: {
        autoclose?: boolean;
    }) => Promise<void> | void;
    hide: () => void;
    remove: () => void;
    fetch: () => void;
    setLoaders: (val: CuboDataViewCardLoaders) => void;
};

type CuboDataViewListDataProps<T> = {
    type?: "table" | "pipeline";
    rows?: T[];
    table?: Omit<Partial<CuboTableProps<T>>, 'columns'> & {
        columns: (Omit<CuboTableColumn<T>, 'bodyCell'> & {
            bodyCell?: (ctx: {
                row: T;
                index: number;
                onClick?: () => void;
            }) => VNodeChild;
        })[];
    };
    pipeline?: any;
};

declare function parseRouteQuery<F>(query: any, opts?: CuboDataViewListFiltersProps<F>): CuboDataViewListFiltersQuery<F>;
declare function prepareFiltersToRouteQuery<F>(filters: CuboDataViewListFiltersQuery<F>, props?: CuboDataViewListFiltersProps<F>, opts?: {
    forFetch?: boolean;
}): Record<string, any>;
declare function prepareFiltersToFetch<F>(filters: CuboDataViewListFiltersQuery<F>, extend?: Record<string, any>, opts?: CuboDataViewListFiltersProps<F>): Record<string, any>;

type CuboDataViewListProps<T, F> = {
    header?: CuboDataViewListHeaderProps<T, F>;
    data?: CuboDataViewListDataProps<T>;
    query?: CuboDataViewListFiltersQuery<F>;
    totals?: CuboDataViewListTotals;
    rows?: T[];
    extendQuery?: Record<string, any>;
    slotBeforeAll?: () => JSX$1.Element;
    slotAfterHeader?: () => JSX$1.Element;
    slotAfterData?: () => JSX$1.Element;
};

type CuboDataViewProps<T = unknown, F = unknown> = {
    list: CuboDataViewListProps<T, F>;
    card?: Omit<CuboDataViewCardProps<T, F>, 'card' | 'loaders'>;
    queries?: CuboDataViewQueries<T, F>;
    routeName?: string;
    rights?: CuboDataViewCardRights;
    crdt?: {
        client: any;
        entity: string;
    };
};
type CuboDataViewEmits = {};
type CuboDataViewInstance = {
    fetch: () => void;
    change: (value: CuboDataViewListFiltersQuery<any>) => void;
};
declare const CuboDataView: new <T extends CuboDataViewModel<T>, F extends Record<string, any> = {}>(props: CuboDataViewProps<T, F> & {} & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps) => vue.CreateComponentPublicInstanceWithMixins<CuboDataViewProps<T, F> & {}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, CuboDataViewEmits, vue.PublicProps, {}, false, {}, {}, {}, {}, string, {}, any, vue.ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
}, CuboDataViewProps<T, F> & {}, {}, {}, {}, {}, {}>;

type CuboMessage = {
    id: number;
    type: 'info' | 'success' | 'warning' | 'error';
    text: string;
    duration?: number;
    title?: string;
    timeout: any;
};

type CuboMessagesFireOptions = {
    title?: string;
    duration?: number;
    zIndex?: number;
};
declare const MESSAGES_Z_INDEX = 100;
declare const CuboMessagesLegacyComponent: vue.DefineComponent<vue.ExtractPropTypes<{
    messages: {
        type: PropType<CuboMessage[]>;
        default: () => never[];
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>, () => JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    messages: {
        type: PropType<CuboMessage[]>;
        default: () => never[];
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    messages: CuboMessage[];
    zIndex: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare class CuboMessagesLegacy {
    constructor();
    private duration;
    private maxCount;
    messages: vue.Ref<{
        id: number;
        type: "info" | "success" | "warning" | "error";
        text: string;
        duration?: number | undefined;
        title?: string | undefined;
        timeout: any;
    }[], CuboMessage[] | {
        id: number;
        type: "info" | "success" | "warning" | "error";
        text: string;
        duration?: number | undefined;
        title?: string | undefined;
        timeout: any;
    }[]>;
    zIndex: vue.Ref<number, number>;
    clear(): void;
    message(message: Pick<CuboMessage, "type" | "text">, opts?: CuboMessagesFireOptions): void;
    info(text: string, opts?: CuboMessagesFireOptions): void;
    success(text: string, opts?: CuboMessagesFireOptions): void;
    warning(text: string, opts?: CuboMessagesFireOptions): void;
    error(text: string, opts?: CuboMessagesFireOptions): void;
}
declare function createMessages(): CuboMessagesLegacy;
declare function useMessages(): CuboMessagesLegacy;

type CuboNavbarLogotypeProps = {
    image?: string;
    text?: string;
    route?: RouteLocationRaw;
};
type CuboNavbarMenuProps = {
    elements: CuboNavbarMenuElement[];
};
type CuboNavbarMenuElement = {
    label: string;
    route: RouteLocationRaw;
    active?: boolean;
};
type CuboNavbarUserProps = {
    name?: string;
    pic?: string;
    menu?: CuboNavbarUserMenuElement[];
};
type CuboNavbarThemeProps = {
    default?: 'dark' | 'light';
};
type CuboNavbarUserMenuElement = {
    label?: string;
    delimiter?: true;
    route?: RouteLocationRaw;
    link?: string;
    onClick?: (e: MouseEvent) => void;
};

type CuboNavbarProps = {
    logotype?: CuboNavbarLogotypeProps;
    menu?: CuboNavbarMenuProps;
    user?: boolean | CuboNavbarUserProps;
    theme?: CuboNavbarThemeProps;
    containered?: boolean;
};
declare const CuboNavbar: vue.DefineSetupFnComponent<CuboNavbarProps, {}, {}, CuboNavbarProps & {}, vue.PublicProps>;

declare const CUBO_SELECT_PROPS: any;

type CuboFormFieldProps = {
    label?: CuboSlot;
    slotLabel?: CuboSlot;
    slotBody?: CuboSlot;
};
type CuboFormFieldEmits = {};
declare const CuboFormField: vue.DefineSetupFnComponent<CuboFormFieldProps, CuboFormFieldEmits, {}, CuboFormFieldProps & {}, vue.PublicProps>;

type CuboFormLineProps = {};
type CuboFormLineEmits = {};
declare const CuboFormLine: vue.DefineSetupFnComponent<CuboFormLineProps, CuboFormLineEmits, {}, {}, vue.PublicProps>;

type CuboFormProps = {
    vertical?: boolean;
};
type CuboFormEmits = {
    submit: () => void;
};

declare const CuboForm: vue.DefineSetupFnComponent<CuboFormProps, CuboFormEmits, {}, CuboFormProps & {
    onSubmit?: (() => any) | undefined;
}, vue.PublicProps>;

type CuboSidebarElement = {
    label: string;
    group?: boolean;
    header?: boolean;
    route?: {
        name?: string;
        params?: {
            [key: string]: string | number;
        };
        query?: {
            [key: string]: string | number;
        };
        href?: string;
        attrs?: HTMLAttributes;
    };
    attrs?: HTMLAttributes;
    children?: CuboSidebarElement[];
};
type CuboSidebarProps = {
    menu: CuboSidebarElement[];
    active?: string;
    attrs?: HTMLAttributes;
};
declare const CuboSidebar: vue.DefineSetupFnComponent<CuboSidebarProps, {}, {}, CuboSidebarProps & {}, vue.PublicProps>;

declare function useRef<T>(value?: T, setter?: (variable: Ref<UnwrapRef<T>>, value: T, oldValue?: T) => void): [Ref<T>, (value: T) => void];
declare function isNumeric(str: string): boolean;
declare function getGlobalStorage(): any & {
    CUBO_CACHE: Record<string, any>;
};
declare function copyToClipboard(text: string): Promise<void>;

export { BADGE_APPEARANCES, CHIP_KINDS, CHIP_STATES, CUBO_COLORS, CUBO_DEFAULT_LANGUAGE, CUBO_ICON_BASE_URL, CUBO_INPUT_TYPES, CUBO_INTL_LOCALE, CUBO_KIT_TRANSLATIONS, CUBO_LANGUAGES, CUBO_SELECT_PROPS, CUBO_SIZES, CUBO_STATES, CUBO_TAG_ICONS, CUBO_TEXT_LINK_ICONS, CUBO_TEXT_LINK_SIZES, CUBO_TEXT_LINK_TONES, CuboAlert, CuboAvatar, CuboBadge, CuboBadgeLegacy, CuboButton, CuboButtonGroup, CuboButtonGroupLegacy, CuboButtonV2, CuboCalendar, CuboCard, CuboCheckbox, CuboChip, CuboColorPicker, CuboConfig, CuboConfirm, CuboData, CuboDataView, CuboDataViewCardFormLine, CuboDatePicker, CuboDrawer, CuboDropdown, CuboEmpty, CuboEmptyContent, CuboEmptyDescription, CuboEmptyHeader, CuboEmptyMedia, CuboEmptyTitle, CuboEventsBox, CuboExpander, CuboForm, CuboFormField, CuboFormLine, CuboI18n, CuboIcon, CuboInlineConfirm, CuboMessages, CuboMessagesLegacy, CuboMessagesLegacyComponent, CuboModal, CuboNavbar, CuboOtp, CuboPagination, CuboPopup, CuboRadio, CuboSearch, CuboSelect, CuboSelectVariants, CuboSidebar, CuboSortable, CuboSpinner, CuboSwitch, CuboTable, CuboTabs, CuboTag, CuboTagGroup, CuboText, CuboTextLink, CuboTextarea, CuboTimeline, CuboToggleGroup, CuboTooltip, ICON_NAMES, KNOWN_ICON_NAMES, MESSAGES_Z_INDEX, STATE_ICON, TAG_APPEARANCES, TAG_SHAPES, TAG_SIZES, TAG_TONES, clearCuboIconCache, copyToClipboard, createCuboI18n, createCuboMessages, createMessages, cuboAlert, cuboConfirm, cuboExtractSvgInner, cuboGet, cuboGetConfig, cuboHexToHsv, cuboHexToRgb, cuboHsvToHex, cuboIconBaseUrl, cuboIconUrl, cuboKitT, cuboNormalizeHex, cuboResolveLanguage, cuboRgbToHex, cuboSetConfig, detectBrowserLanguage, getGlobalStorage, getIconMarkup, hasCuboIconFontProvider, hasIcon, isNumeric, loadCuboGeneratedIcon, loadCuboIconFile, parseRouteQuery, prepareFiltersToFetch, prepareFiltersToRouteQuery, registerCuboIconFontProvider, registerIcons, resolveColor, resolveCuboIconFont, useAlert, useConfirm, useCuboBackground, useCuboIconBaseUrl, useCuboIconSource, useCuboLanguage, useMessages, useRef };
export type { BadgeAppearance, ChipKind, ChipState, CuboAlertOptions, CuboAvatarProps, CuboBadgeLegacyProps, CuboButtonGroupLegacyButton, CuboButtonGroupLegacyProps, CuboButtonGroupProps, CuboButtonProps, CuboButtonV2Appearance, CuboButtonV2Props, CuboButtonV2Shape, CuboButtonV2Size, CuboButtonV2State, CuboButtonV2Tone, CuboCalendarCell, CuboCalendarCellContext, CuboCalendarPreset, CuboCalendarType, CuboCalendarValue, CuboCardEntity, CuboCardField, CuboCardFieldOption, CuboCardFieldType, CuboCardGroup, CuboCardProps, CuboCardRelation, CuboCardTab, CuboCardUser, CuboCheckboxProps, CuboColor, CuboColorName, CuboConfigContext, CuboConfigProps, CuboConfirmOptions, CuboDataAddContext, CuboDataCardContext, CuboDataDetailContext, CuboDataFetchContext, CuboDataField, CuboDataFieldOption, CuboDataFieldType, CuboDataFormatContext, CuboDataOp, CuboDataPagination, CuboDataPreset, CuboDataProps, CuboDataQuery, CuboDataSearchContext, CuboDataSort, CuboDataTableConfig, CuboDataViewCardComponentContext, CuboDataViewEmits, CuboDataViewInstance, CuboDataViewProps, CuboDataViewType, CuboDrawerProps, CuboDropdownItem, CuboDropdownProps, CuboEmptyProps, CuboEventAttachment, CuboEventType, CuboEventUser, CuboEventsBoxProps, CuboFieldChangeEvent, CuboFormEmits, CuboFormFieldEmits, CuboFormFieldProps, CuboFormLineEmits, CuboFormLineProps, CuboFormProps, CuboGlobalConfig, CuboHSV, CuboI18nLocaleTree, CuboI18nOptions, CuboIconFolder, CuboIconFontProvider, CuboIconName, CuboIconProps, CuboIconSource, CuboInputType, CuboKitMessageKey, CuboKitMessages, CuboLanguage, CuboLanguageInfo, CuboMessage$1 as CuboMessage, CuboMessageEvent, CuboMessagesController, CuboMessagesFireOptions, CuboMessagesOptions, CuboMessagesPosition, CuboMessagesProps, CuboMessagesPushOptions, CuboNavbarLogotypeProps, CuboNavbarMenuElement, CuboNavbarMenuProps, CuboNavbarProps, CuboNavbarThemeProps, CuboNavbarUserMenuElement, CuboNavbarUserProps, CuboNotification, CuboOtpProps, CuboOtpState, CuboPaginationItem, CuboPopoverPosition, CuboPopupPosition, CuboRGB, CuboRadioOption, CuboRadioProps, CuboRemoteIcon, CuboSearchItem, CuboSearchProps, CuboSelectBaseProps, CuboSelectCustomProps, CuboSelectForbidden, CuboSelectProps, CuboSelectTriggerEvent, CuboSelectValue, CuboSelectVariant, CuboSelectVariantsBaseProps, CuboSelectVariantsProps, CuboSidebarElement, CuboSidebarProps, CuboSize, CuboSlot, CuboSortableAddContext, CuboSortableItem, CuboSortablePosition, CuboSortableProps, CuboState, CuboSwitchProps, CuboSystemEvent, CuboTableColumn, CuboTableProps, CuboTabsItem, CuboTabsItemContext, CuboTabsProps, CuboTagIconName, CuboTaskEvent, CuboTaskResultOption, CuboTextLinkIconName, CuboTextLinkProps, CuboTextLinkSize, CuboTextLinkTone, CuboTextProps, CuboTextValue, CuboTimelineDraft, CuboTimelineEvent, CuboTimelineEventType, CuboTimelineField, CuboTimelineFieldOption, CuboTimelineProps, CuboToggleGroupItem, CuboToggleGroupProps, IconName, IconNameOrString, TagAppearance, TagShape, TagSize, TagTone };
