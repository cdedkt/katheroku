const categories =
   [  {
       id: '072dce3f-6b70-4921-a4c0-b5129d0878a4',
       decathlon_id: 674413,
       label: 'Chaussures running homme' },
      {
       id: '0f86d501-811a-4ff1-a8fd-4dbce16d3204',
       decathlon_id: 732297,
       label: 'Tout pour le trail' },
      {
       id: 'f26ce8d6-4797-497b-804e-c37189c0ed26',
       decathlon_id: 674214,
       label: 'Trail' },
      {
       id: '057308e6-b461-46ed-9ccb-d5847ca4caa5',
       decathlon_id: 675883,
       label: 'Chaussures Trail Homme' },
      {
       id: '8d056a69-1c9e-455a-87a8-3164ea6ac59b',
       decathlon_id: 674412,
       label: 'Chaussures running' },
      {
       id: '983a4556-f72d-44c2-ab36-ed876fa573fd',
       decathlon_id: 674213,
       label: 'Tout pour courir' },
      {
       id: '5fb01555-036a-4b19-bf48-6f0885f8053d',
       decathlon_id: 732299,
       label: 'Toutes les chaussures running' } ];
	   
console.log(categories.filter(categorie => categorie.id==='0f86d501-811a-4ff1-a8fd-4dbce16d3204')[0].label);

