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
      src.includes('3, 2, 4'),
      '===> TEST (Parameters): The src should include the x, y, z parameters'
    );
    await this.pauseTest()

    assert.ok(
      src.includes('150x150@2x'),
      'the src should include the width,height and @2x parameter'
    );


  });

  test('it updates the `src` attribute when the arguments change', async function (assert) {
    this.setProperties({
      x: 3,
      ylng: 2,
      z: 4,
      width: 150,
      height: 150,
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
      img.src.includes('3, 2, 4'),
      'the src should include the lng,lat,zoom parameter'
    );

    assert.ok(
      img.src.includes('150x150@2x'),
      'the src should include the width,height and @2x parameter'
    );

    this.setProperties({
      width: 300,
      height: 200,
    });

    assert.ok(
      img.src.includes('3, 2, 4'),
      'the src should include the lng,lat,zoom parameter'
    );

    assert.ok(
      img.src.includes('300x200@2x'),
      'the src should include the width,height and @2x parameter'
    );

    this.setProperties({
      x: 3,
      y: 2,
      z: 5,
    });

    assert.ok(
      img.src.includes('3, 2, 5'),
      'the src should include the lng,lat,zoom parameter'
    );

    assert.ok(
      img.src.includes('300x200@2x'),
      'the src should include the width,height and @2x parameter'
    );
  });
/** 
  test('the default alt attribute can be overridden', async function (assert) {
    await render(hbs`<Map
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
      alt="A map of San Francisco"
    />`);

    assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
  });

  test('the src, width and height attributes cannot be overridden', async function (assert) {
    await render(hbs`<Map
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
      src="/assets/images/teaching-tomster.png"
      width="200"
      height="300"
    />`);

    assert
      .dom('.map img')
      .hasAttribute('src', /^https:\/\/api\.mapbox\.com\//)
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');
  });
  */
});