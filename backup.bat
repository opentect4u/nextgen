@echo off
REM Set the username, password, database name, and output file path
SET USERNAME=root
SET PASSWORD=NxtGen#953*
SET DBNAME=nextgen



:: Set the date and time variable
for /f "tokens=2 delims==" %%i in ('wmic os get localdatetime /value') do set datetime=%%i

set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
set hour=%datetime:~8,2%
set minute=%datetime:~10,2%
set second=%datetime:~12,2%

SET DATESTAMP=%year%-%month%-%day%_%hour%-%minute%-%second%

              
SET OUTPUT_PATH="C:\backup\%DBNAME%_%DATESTAMP:.=%".sql

REM Run the MySQL dump command
mysqldump -u %USERNAME% -p%PASSWORD% %DBNAME% > %OUTPUT_PATH%

REM Notify when complete
echo Dump file created at %OUTPUT_PATH%
pause