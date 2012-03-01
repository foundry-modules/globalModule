include ../../build/modules.mk

all:
	cp source/globalModule.js ${LIBRARY_DEV}/globalModule.js
	${UGLIFYJS} source/globalModule.js > ${LIBRARY_PRO}/globalModule.js
