import Route from '@ember/routing/route';
const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];
export default class IndexRoute extends Route {

   
/*     async model() {
    return {
      title: 'Grand Old Mansion',
      owner: 'Veruca Salt',
      city: 'San Francisco',
      location: {
        x: 3,
        y: 2,
        z: 4,
      },
      category: 'Estate',
      type: 'Standalone',
      bedrooms: 15,
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
    }; 
  } */

      
 async model(){   

    let response = await fetch('../api/rentals.json');
    let parsed = await response.json();
    console.log(parsed)
    return parsed; 

    }
    
}