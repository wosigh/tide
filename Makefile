APPID = us.ryanhope.tide

ace/build/src/ace.js:
	cd ace; make
	
prepare:
	git submodule update --init --recursive
	cd ace;\
	git remote set-url --push origin git@git.webos-internals.org:js/ace;\
	cd support/pilot;\
	git remote set-url --push origin git@git.webos-internals.org:js/pilot
	
package: ace/build/src/ace.js
	palm-package -X excludes.txt . package node-service
	ar q ${APPID}_*.ipk pmPostInstall.script
	ar q ${APPID}_*.ipk pmPreRemove.script

install: package
	palm-install ${APPID}_*.ipk
	palm-launch ${APPID}

clean:
	cd ace; make clean
	rm -rf *.ipk