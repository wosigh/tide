ace: clean
	cd ace; make
	
clean:
	cd ace; make clean
	
prepare:
	git submodule update --init --recursive
	cd ace; npm install uglify-js