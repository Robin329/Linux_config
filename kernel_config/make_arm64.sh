#!/bin/bash

#export ARCH=arm64
#echo "export ARCH=arm64"
#export CROSS_COMPILE=aarch64-linux-gnu-
#echo "export CROSS_COMPILE=aarch64-linux-gnu-"

make  ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu-
