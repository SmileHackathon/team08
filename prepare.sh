#!/bin/bash

mkdir -p data
curl -o data/steam_all_apps.json "https://api.steampowered.com/ISteamApps/GetAppList/v2/"