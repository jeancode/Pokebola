          
            //Espero se diviertan con este codigo de mierda
			if ( WEBGL.isWebGLAvailable() === false ) {
				document.body.appendChild( WEBGL.getWebGLErrorMessage() );
			}
			
			var container, grup ;
			var camera, scene, renderer, controls;
			init();
			animate();
			function init() {
				container = document.createElement( 'div' );
                
				document.body.appendChild( container );
                
				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
                
				camera.position.set( 10,230, 0 );
                
				scene = new THREE.Scene();
             
				var geometry = new THREE.SphereBufferGeometry( 14, 30, 30 );
        
                grup =  new THREE.Group();
            
                for(var i = 0; i <= 6;i++){
                    
                    eval(`

                    var t${i} = new THREE.TextureLoader().load( "t${i}.jpg" );
                    var e${i} = new THREE.MeshStandardMaterial( {
					opacity: 1,
					transparent: true,
                    color:0xf23001,
                    emissive: new THREE.Color("rgb(255, 0, 0)"),
                    emissiveMap:t${i},
                    map:t${i},
                    metalness: 0.1,
				    roughness: 0.1,
				    aoMapIntensity: 1.0,
				    
				    });`);
                    
                    var mesh = new THREE.Mesh( geometry, eval(`e${i}`) );
				    mesh.position.x =  Math.sin(i*9)*40;
                    mesh.position.z =  Math.cos(i*9)*40;
                    
                    mesh.rotation.z =1.5;
				    
                    grup.add(mesh);
                }
                
                console.log(grup);

                scene.add( grup );
				//
				var geometry = new THREE.PlaneBufferGeometry( 800, 800 );
				var material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
				var mesh = new THREE.Mesh( geometry, material );
           
         
				var spotLight = new THREE.SpotLight( 0x505050 );
				spotLight.position.set( 100, 200, 100 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra =0;//dispercion en el suelo
				scene.add( spotLight );
                
				var spotLight = new THREE.SpotLight( 0xff3100 );
				spotLight.position.set( - 100, - 100, - 100 );
				spotLight.angle = Math.PI / 6;
				spotLight.penumbra = 0;
				scene.add( spotLight );
				//
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				container.appendChild( renderer.domElement );
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
			
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				window.addEventListener( 'resize', onWindowResize, false );

			}
			function onWindowResize() {
				var width = window.innerWidth;
				var height = window.innerHeight;
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize( width, height );
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				render();
                grup.rotation.y += 0.004;
                
                for(var a  in grup.children){
                    grup.children[a].rotation.y -=0.01;    
                }
                
			}
			function render() {
		
				renderer.render( scene, camera );
			}