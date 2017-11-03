#!/bin/bash
cd /home/pimonty/Android/Sdk/tools
./emulator -list-avds
#./emulator -avd Nexus_5X_API_26_x86 -qemu -m 512 -enable-kvm
./emulator -avd Nexus_5X_API_26_x86 -netdelay none -netspeed full
