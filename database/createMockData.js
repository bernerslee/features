
const get_random = function (array) {
   if (array.length < 1) {
     return ''
   } else {
     return array[Math.floor((Math.random()*array.length))];
   }
 }; 
 
 let interior_features = {
    appliances: ['Dishwasher','Dryer', 'Garbage disposal', 'Refrigerator', 'Washer'],
    heating: ['Forced air', 'Fan', 'Speeder air'],
    cooling: ['None', 'A/C', 'Central'],
    year_built: function (min,max) {
     return Math.round(Math.random() * (max-min) + min);
    },
    kitchen_features: ['Counter', 'Pantry', 'Updated Kitchen', 'Eat In Kitchen'],
    flooring: function (min,max) {
     return Math.round(Math.random() * (max-min) + min)}
 };
 
 let houseFeatures = {
   type: ['Single Family', 'Multifamily', 'Condo', 'Townhome'],
   year_built: function (min,max) {
     return Math.round(Math.random() * (max-min) + min);
    },
   heating:['No Data', 'None', 'Central'],
   cooling: ['None', 'Central'],
   parking: ['None', '1 Space', '2 Spaces', '3 Spaces'],
   lot: function (min,max) {
     return Math.round(Math.random() * (max-min) + min)
    },
   pricePerSqft: "TBD"
 
 };
 
 const createFeatures = (callback) => {
   var features = [];
     for (let i = 0; i < 100; i++) {
       features.push({
         Type: get_random(houseFeatures.type),
         Year_Built: houseFeatures.year_built(1900,2006),
         Heating: get_random(houseFeatures.heating),
         Cooling: get_random(houseFeatures.cooling),
         Parking: get_random(houseFeatures.parking),
         Lot: houseFeatures.lot(1000,3000)+' sqft',
         Price: "hello"
       });
     }
   return features;
 };
 
 const createInteriorFeatures = (callback) => {
   var interiorFeatures = [];
    for (let i = 0; i < 100; i++) {
       interiorFeatures.push(
         {
           Bedrooms: Math.round(Math.random() * 4),
           Appliances: interior_features.appliances,
           Year_built: interior_features.year_built(1900,2006),
           Heating: get_random(interior_features.heating),
           Kitchen: interior_features.kitchen_features
         }
      );
      
     }
  return interiorFeatures;
 };
 
 
 

module.exports = {
   createInteriorFeatures,
   createFeatures
};

