rem ####################create here########################

copy /y ..\define\*.ts
copy /y ..\sys\*.ts
copy /y ..\sys\*.js
copy /y ..\ui\*.ts
copy /y ..\ui\*.js
copy /y ..\box\*.ts
copy /y ..\box\*.js
copy /y ..\box\dialog\*.ts
copy /y ..\box\dialog\*.js
copy /y ..\box\format\*.ts
copy /y ..\box\format\*.js

build -do merge --js extend.js,core.js,html.js,svg.js,control.js,modal.js,common.js,textbox.js,list.js,toolist.js,dialog.js,color.js,dropcolor.js,spinner.js,toggle.js --kd true --kf "var sys;,var ui;,(function (sys) {,(function (ui) {" --kl "})(sys || (sys = {}));,})(ui || (ui = {}));" --o dll1.js
build -do merge --js edgebar.js,footbar.js,prompt.js,dialogconfig.js,boxconfig.js,formathelper.js,diagram.js,formatconfig.js --kd true --kf "var box;,(function (box) {" --kl "})(box || (box = {}));" --o box1.js


rem ######################process here#####################

rem build -do lang --i lang-en.txt --o lang-en.js
build -do lang --i lang-zh.txt --o lang-zh.js

rem java -jar compiler.jar --js dll0.js --js_output_file min\dll0.js
rem java -jar compiler.jar --js box0.js --js_output_file min\box0.js

copy /y dll1.js dll1.ori.js
copy /y box1.js box1.ori.js
build -do replace --ts *.ts --js dll1.js
build -do replace --ts *.ts --js box1.js

build -do define --i define.ts --js box1.js
build -do define --i define.ts --js dll1.js

rem copy /y lang-en.js min\lang-en.js
copy /y lang-zh.js min\lang-zh.js
java -jar compiler.jar --js dll1.js --js_output_file min\dll1.js
java -jar compiler.jar --js box1.js --js_output_file min\box1.js

rem build -do replace --ts *.ts --js min\lang.js
rem build -do replace --ts *.ts --js min\dll1.js
rem build -do replace --ts *.ts --js min\box1.js

copy /y min\lang-zh.js c:\graph\web\js\lang.js
copy /y min\box0.js c:\graph\web\js\box0.js
copy /y min\dll0.js c:\graph\web\js\dll0.js
copy /y min\dll1.js c:\graph\web\js\dll1.js
copy /y min\box1.js c:\graph\web\js\box1.js

time/t
