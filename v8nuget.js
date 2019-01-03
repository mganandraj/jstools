const fs = require('fs');
var program = require('commander');
const path = require('path');
const ncp = require('ncp').ncp;


program
  .version('0.1.0')
  .option('-c, --v8dir [V8 dir]', 'specify', 'E:\\JS\\V8\\v8\\')
  .option('-c, --dest [destination]', 'specify', '.')
  .parse(process.argv);


console.log('v8dir', program.v8dir);
console.log('dest', program.dest);

const destDirtPath = path.format({dir: program.dest,  base: 'Office.Google_V8' });
console.log('Destination directory: ' + destDirtPath);
fs.existsSync(destDirtPath) || fs.mkdirSync(destDirtPath);

const nuspec = path.format({dir: destDirtPath,  base: 'Office.Google_V8.nuspec' });

fs.writeFileSync(nuspec, `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
    <metadata>
        <id>Office.Google_V8</id>
        <version>1.3.0</version>
        <authors>Microsoft</authors>
        <owners>Microsoft</owners>
        <requireLicenseAcceptance>false</requireLicenseAcceptance>
        <projectUrl>https://v8.dev/</projectUrl>
        <description>V8 binaries and header. Details are included in v8.txt. TODO : Get the license URL and mark as requiring license approval.</description>
    </metadata>
</package>`);

const buildPath = path.format({dir: destDirtPath,  base: 'build' });
console.log('Destination build directory: ' + buildPath);
fs.existsSync(buildPath) || fs.mkdirSync(buildPath);

const target = path.format({dir: buildPath,  base: 'Office.Google_V8.targets' });
fs.writeFileSync(target, `<?xml version="1.0" encoding="utf-8"?>
<Project ToolVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemDefinitionGroup>
    <Link>
      <AdditionalDependencies Condition="'$(Configuration)' == 'Debug' And '$(Platform)' == 'arm'">$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8_libbase.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8_libplatform.dll.lib;%(AdditionalDependencies)</AdditionalDependencies>
      <AdditionalDependencies Condition="'$(Configuration)' == 'Release' And '$(Platform)' == 'arm'">$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8_libbase.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8_libplatform.dll.lib;%(AdditionalDependencies)</AdditionalDependencies>
      <AdditionalDependencies Condition="'$(Configuration)' == 'Debug' And '$(Platform)' == 'x64'">$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8_libbase.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8_libplatform.dll.lib;%(AdditionalDependencies)</AdditionalDependencies>
      <AdditionalDependencies Condition="'$(Configuration)' == 'Release' And '$(Platform)' == 'x64'">$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8_libbase.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8_libplatform.dll.lib;%(AdditionalDependencies)</AdditionalDependencies>
      <AdditionalDependencies Condition="'$(Configuration)' == 'Debug' And ('$(Platform)' == 'Win32' Or '$(Platform)' == 'x86')">$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8_libbase.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8_libplatform.dll.lib;%(AdditionalDependencies)</AdditionalDependencies>
      <AdditionalDependencies Condition="'$(Configuration)' == 'Release' And ('$(Platform)' == 'Win32' Or '$(Platform)' == 'x86')">$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8_libbase.dll.lib;$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8_libplatform.dll.lib;%(AdditionalDependencies)</AdditionalDependencies>
    </Link>
    <ClCompile>
      <AdditionalIncludeDirectories>$(MSBuildThisFileDirectory)include;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
    </ClCompile>
  </ItemDefinitionGroup>
  <ItemGroup Condition="'$(Configuration)' == 'Debug' And '$(Platform)' == 'arm'">
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8_libbase.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8_libbase.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8_libplatform.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\v8_libplatform.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\natives_blob.bin" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Debug\\snapshot_blob.bin" />
  </ItemGroup>
  <ItemGroup Condition="'$(Configuration)' == 'Release' And '$(Platform)' == 'arm'">
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8_libbase.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8_libbase.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8_libplatform.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\v8_libplatform.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\natives_blob.bin" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\arm\\Release\\snapshot_blob.bin" />
  </ItemGroup>
  <ItemGroup Condition="'$(Configuration)' == 'Debug' And '$(Platform)' == 'x64'">
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8_libbase.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8_libbase.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8_libplatform.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\v8_libplatform.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\natives_blob.bin" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Debug\\snapshot_blob.bin" />
  </ItemGroup>
  <ItemGroup Condition="'$(Configuration)' == 'Release' And '$(Platform)' == 'x64'">
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8_libbase.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8_libbase.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8_libplatform.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\v8_libplatform.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\natives_blob.bin" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x64\\Release\\snapshot_blob.bin" />
  </ItemGroup>
  <ItemGroup Condition="'$(Configuration)' == 'Debug' And ('$(Platform)' == 'Win32' Or '$(Platform)' == 'x86')">
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8_libbase.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8_libbase.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8_libplatform.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\v8_libplatform.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\natives_blob.bin" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Debug\\snapshot_blob.bin" />
  </ItemGroup>
  <ItemGroup Condition="'$(Configuration)' == 'Release' And ('$(Platform)' == 'Win32' Or '$(Platform)' == 'x86')">
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8_libbase.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8_libbase.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8_libplatform.dll" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\v8_libplatform.dll.pdb" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\natives_blob.bin" />
    <ReferenceCopyLocalPaths Include="$(MSBuildThisFileDirectory)..\\lib\\x86\\Release\\snapshot_blob.bin" />
  </ItemGroup>
</Project>`);

const include = path.format({dir: buildPath,  base: 'include' });
fs.existsSync(buildPath) || fs.mkdirSync(buildPath);

const incsrc = path.format({dir: program.v8dir,  base: 'include' });

ncp.limit = 16;

ncp(incsrc, include, function (err) {
 if (err) {
   return 'Header copy failed: ' + console.error(err);
 }
 console.log('header are copied.');
});

const libPath = path.format({dir: destDirtPath,  base: 'lib' });
console.log('Destination lib directory: ' + buildPath);
fs.existsSync(libPath) || fs.mkdirSync(libPath);

var platforms = ['x64', 'x86', 'arm'];
var flavors = ['Release', 'Debug'];

for(var p=0; p<platforms.length; p++) {
    for(var f=0; f<flavors.length; f++) {
        var platform = platforms[p];
        var flavor = flavors[f];

        var srcdir = path.format({dir: program.v8dir,  base: 'out' });
        srcdir = path.format({dir: srcdir,  base: platform });
        srcdir = path.format({dir: srcdir,  base: flavor });
        if(!fs.existsSync(srcdir)){
            console.err("Library directory doesn't exist: " + srcdir);
            process.exit(-1);
        }


        var destdir = path.format({dir: libPath,  base: platform });
        fs.existsSync(destdir) || fs.mkdirSync(destdir);
        destdir = path.format({dir: destdir,  base: flavor });
        fs.existsSync(destdir) || fs.mkdirSync(destdir);

        console.log("Source lib path: " + srcdir + ";; Dest lib path: " + destdir);

        var copylib = function (f) {
            file = f +'.dll';
            fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });
            
            file = f + '.dll.pdb';
            fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

            file = f + '.dll.lib';
            fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });
        }

        copylib("v8");
        copylib("v8_libplatform");
        copylib("v8_libbase");

        var file = 'natives_blob.bin';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'snapshot_blob.bin';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'd8.exe';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'd8.exe.pdb';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'mksnapshot.exe';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'mksnapshot.exe.pdb';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'torque.exe';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'torque.exe.pdb';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });

        file = 'args.gn';
        fs.copyFile(path.format({dir: srcdir,  base: file }), path.format({dir: destdir,  base: file }), (err) => { if (err) throw err; });
    }    
}