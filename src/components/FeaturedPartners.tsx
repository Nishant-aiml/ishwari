import React from 'react';

interface Partner {
  id: number;
  name: string;
  type: 'NGO' | 'Food Bank' | 'Corporate';
  logo: string;
  description: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Food For All Foundation",
    type: "NGO",
    logo: "https://placehold.co/100x100?text=FFA",
    description: "Dedicated to eliminating hunger in urban communities."
  },
  {
    id: 2,
    name: "City Food Bank",
    type: "Food Bank",
    logo: "https://placehold.co/100x100?text=CFB",
    description: "Largest food distribution network in the city."
  },
  {
    id: 3,
    name: "GreenMart Supermarkets",
    type: "Corporate",
    logo: "https://placehold.co/100x100?text=GM",
    description: "Leading sustainable food retail chain."
  },
  {
    id: 4,
    name: "Helping Hands NGO",
    type: "NGO",
    logo: "https://placehold.co/100x100?text=HH",
    description: "Community-driven food rescue organization."
  }
];

const FeaturedPartners = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Our Featured Partners
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map(partner => (
          <div
            key={partner.id}
            className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-20 h-20 object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {partner.name}
            </h4>
            <span className="px-3 py-1 rounded-full text-sm font-medium mb-2
              ${partner.type === 'NGO' ? 'bg-blue-100 text-blue-800' :
                partner.type === 'Food Bank' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'}">
              {partner.type}
            </span>
            <p className="text-gray-600 text-center text-sm">
              {partner.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Become a Partner
        </button>
      </div>
    </div>
  );
};

export default FeaturedPartners;
