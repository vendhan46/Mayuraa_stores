/*
  Departments and the floor directory.
  Everything below is FICTIONAL demo content created for this design sample.
  `image` values are Unsplash photo IDs (see components/ui/SmartImage.jsx).
*/

export const departments = [
  {
    id: 'sarees',
    name: 'Sarees & Ethnic',
    blurb: 'Kanchipuram, Banarasi, Chanderi and everyday cottons. 4,000+ sarees on one floor.',
    floor: 2,
    image: '1610030469983-98e550d6193c',
    size: 'large',
  },
  {
    id: 'men',
    name: 'Menswear',
    blurb: 'Kurtas, suits, formals and casuals.',
    floor: 3,
    image: '1617137968427-85924c800a22',
    size: 'tall',
  },
  {
    id: 'kids',
    name: 'Kids & Toys',
    blurb: 'Newborn to teens, plus the toy corner.',
    floor: 4,
    image: '1503919545889-aef636e10ad4',
    size: 'small',
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    blurb: 'BIS-hallmarked gold, diamonds and silver.',
    floor: 0,
    image: '1515562141207-7a88fb7ce338',
    size: 'small',
  },
  {
    id: 'home',
    name: 'Home & Living',
    blurb: 'Furniture, kitchen, bedding and décor.',
    floor: 5,
    image: '1521334884684-d80222895322',
    size: 'wide',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    blurb: 'Phones, audio, appliances and laptops.',
    floor: 1,
    image: '1498049794561-7780e7231661',
    size: 'small',
  },
]

/* Floor directory for the interactive store guide. */
export const floors = [
  {
    level: 'G',
    name: 'Ground floor',
    headline: 'Jewellery, beauty & gifting',
    sections: ['Gold & diamond jewellery', 'Silver & gifting', 'Beauty & fragrance', 'Customer service desk'],
    note: 'Also home to the billing counters, lockers and the MAYURA Circle desk.',
  },
  {
    level: '1',
    name: 'First floor',
    headline: 'Electronics & appliances',
    sections: ['Mobiles & laptops', 'TVs & audio', 'Kitchen appliances', 'Large appliances'],
    note: 'Live demo kitchen every weekend, 4 pm – 7 pm.',
  },
  {
    level: '2',
    name: 'Second floor',
    headline: 'Sarees & ethnic wear',
    sections: ['Silk sarees', 'Cotton & daily wear', 'Salwar & lehenga', 'Blouse tailoring counter'],
    note: 'Seated saree viewing with tea. Bring the family.',
  },
  {
    level: '3',
    name: 'Third floor',
    headline: 'Menswear & footwear',
    sections: ['Kurtas & ethnic', 'Formals & suits', 'Casuals & denim', 'Footwear for all'],
    note: 'Suit alterations done on the floor, ready in 48 hours.',
  },
  {
    level: '4',
    name: 'Fourth floor',
    headline: 'Kids, toys & school',
    sections: ['Newborn & infant', 'Boys & girls 2–14', 'Toys & games', 'School uniforms & bags'],
    note: 'Play corner with supervision so parents can shop in peace.',
  },
  {
    level: '5',
    name: 'Fifth floor',
    headline: 'Home, kitchen & the café',
    sections: ['Furniture & mattresses', 'Kitchen & dining', 'Bedding & bath', 'MAYURA Café'],
    note: 'Filter coffee and a terrace view. The café stays open till 10 pm.',
  },
]
