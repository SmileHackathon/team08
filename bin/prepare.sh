#!/bin/sh

mkdir -p ext_data
curl -o ext_data/steam_all_apps.json "https://api.steampowered.com/ISteamApps/GetAppList/v2/"