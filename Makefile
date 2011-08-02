APPID = us.ryanhope.tide

ace: clean
	cd ace; make
	
clean:
	cd ace; make clean
	rm -rf *.ipk
	
prepare:
	git submodule update --init --recursive
	cd ace;\
	git remote set-url --push origin git@git.webos-internals.org:js/ace;\
	cd support/pilot;\
	git remote set-url --push origin git@git.webos-internals.org:js/pilot
	
package: ace
	palm-package -X excludes.txt . package node-service

install: package
	palm-install ${APPID}_*.ipk
	palm-launch ${APPID}
