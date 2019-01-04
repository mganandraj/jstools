ECHO OFF
setlocal enabledelayedexpansion

SET SRC=E:\JS\V8
SET OUT=out_no_external_snapshot

SET DEPOT_TOOLS=%SRC%\depot_tools\
if NOT EXIST %DEPOT_TOOLS% ( 
    ECHO "DEPOT_TOOLS must exist" 
    EXIT
)

set PATH=%DEPOT_TOOLS%;%PATH%
set DEPOT_TOOLS_WIN_TOOLCHAIN=0

FOR %%P IN (x64, x86) DO (
    FOR %%F IN (Debug, Release) DO (
        mkdir %SRC%\v8\%OUT%\%%P\%%F
        pushd %SRC%\v8\%OUT%\%%P\%%F

        set DEBUG=false
        if '%%F' == 'Debug' (
            set DEBUG=true
        )

        call gn gen . "--args=is_debug=!DEBUG! target_cpu=\"%%P\" v8_use_snapshot=true v8_use_external_startup_data=false v8_enable_i18n_support = false is_component_build = true"

        call ninja -v

        popd

    )
) 

