APPID = us.ryanhope.tide

ace: clean
	cd ace; make
	
clean:
	cd ace; make clean
	rm -rf *.ipk
	
prepare:
	git submodule update --init --recursive
	cd ace; npm install uglify-js
	
package: ace
	palm-package -X excludes.txt . package node-service

install: package
	palm-install ${APPID}_*.ipk
	palm-launch ${APPID}