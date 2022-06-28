import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  // Colocamos los parámetros que le pusimos a nuestro mapa
  test('it renders a map image for the specified parameters', async function (assert) {
    await render(hbs`<Map
    @x = "3"
    @y = "2"
    @z = "4" 
    @width = "150"
    @height = "150"
    />`);

    
    assert
    .dom('.map img')
    .exists()
    .hasAttribute('alt', 'Un mapa con sus coordenadas 3, 2, 4')
    .hasAttribute('src')
    .hasAttribute('width', '150')
    .hasAttribute('height', '150');
    
    let { src } = find('.map img'); //El find es un helper para encontrar elementos en el DOM
    /**
     *... Normalmente cuando tengas errores del tipo 'Cannot read properties of undefined' lo nromal es que esté fallando la asignación de esa variable, puedes ir debugeando de forma que
          utilizando el mismo console.log o el inspector del navegador (a tu parecer) puedas ir viendo el valor de la variable, normalmente si te da ese error mencionado es porque la variable
          src está como "undefined", un console.log(src) y vamos viendo como queda.    
    **/
 

    // Assertion de start con maptiles
    console.log(src)
    assert.ok(
      src.startsWith('https://maptiles.p.rapidapi.com/'),
      '===> TEST: The src was started with "https://maptiles.p.rapidapi.com"'
      );
      
    //Assertion de parámetros x, y, z
    assert.ok(
      src.includes('3'),
      '===> TEST (Parameters): The src should include the x, y, z parameters'
    );


  });

  /** ===================== U P D A T E    T E S T S =====================  **/

  //
  test('===> TEST [UPDATES]: It updates the `src` attribute when the arguments change', async function (assert) {
    this.setProperties({
      x: 5,
      y: 2,
      z: 4,
      width: 120,
      height: 120,
    });

    await render(hbs`<Map
      @x={{this.x}}
      @y={{this.y}}
      @z={{this.z}}
      @width={{this.width}}
      @height={{this.height}}
    />`);

    let img = find('.map img');

    assert.ok(
      img.src.includes('5'),
      'the src should include the lng,lat,zoom parameter'
    );
    
    assert.ok(
      img.src.includes('120'),
      'the src should include the width,height and @2x parameter'
    );
    await this.pauseTest()

  });
});