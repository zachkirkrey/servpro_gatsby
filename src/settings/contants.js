const ProductServices = [
  { value: 'Answering Phone Services', name: 'Answering Phone Services' },
  { value: 'Asset Tracking', name: 'Asset Tracking' },
  { value: 'Auto Glass Repair', name: 'Auto Glass Repair' },
  { value: 'Auto Painting', name: 'Auto Painting' },
  {
    value: 'Awards &amp; Employee Recognition',
    name: 'Awards &amp; Employee Recognition'
  },
  {
    value: 'Background Screening and Drug Testing',
    name: 'Background Screening and Drug Testing'
  },
  {
    value: 'Boxes and Packaging Supplies',
    name: 'Boxes and Packaging Supplies'
  },
  { value: 'Car Rentals', name: 'Car Rentals' },
  { value: 'Cleaning Supplies', name: 'Cleaning Supplies' },
  { value: 'Computers and Technology', name: 'Computers and Technology' },
  { value: 'Construction Software', name: 'Construction Software' },
  { value: 'Contents Listing Software', name: 'Contents Listing Software' },
  { value: 'Credit Card Processing', name: 'Credit Card Processing' },
  { value: 'Credit Cards', name: 'Credit Cards' },
  { value: 'Custom Shelving', name: 'Custom Shelving' },
  { value: 'Debt Collections', name: 'Debt Collections' },
  { value: 'Digital Marketing', name: 'Digital Marketing' },
  { value: 'Dry Ice Blasting Equipment', name: 'Dry Ice Blasting Equipment' },
  { value: 'Dumpster Rental', name: 'Dumpster Rental' },
  {
    value: 'Electrical (Suppliers and Subcontractors)',
    name: 'Electrical (Suppliers and Subcontractors)'
  },
  { value: 'Emergency Board Up', name: 'Emergency Board Up' },
  {
    value: 'Environmental Contracting/Hygienist/Safety Consulting',
    name: 'Environmental Contracting/Hygienist/Safety Consulting'
  },
  { value: 'Environmental Testing', name: 'Environmental Testing' },
  { value: 'Equipment', name: 'Equipment' },
  { value: 'Equipment Rental', name: 'Equipment Rental' },
  {
    value: 'Financial/Accounting Consultation',
    name: 'Financial/Accounting Consultation'
  },
  { value: 'Fleet Purchasing Card', name: 'Fleet Purchasing Card' },
  { value: 'Fleet Safety Solutions', name: 'Fleet Safety Solutions' },
  {
    value: 'Flooring (Suppliers and Subcontractors)',
    name: 'Flooring (Suppliers and Subcontractors)'
  },
  {
    value: 'Flooring Analysis and Testing ',
    name: 'Flooring Analysis and Testing '
  },
  { value: 'Fuel Delivery', name: 'Fuel Delivery' },
  {
    value: 'General Contracting and Consulting',
    name: 'General Contracting and Consulting'
  },
  { value: 'GPS Tracking ', name: 'GPS Tracking ' },
  { value: 'Hotels/Lodging', name: 'Hotels/Lodging' },
  {
    value: 'HVAC (Suppliers and Subcontractors)',
    name: 'HVAC (Suppliers and Subcontractors)'
  },
  { value: 'Insurance (Life or Health)', name: 'Insurance (Life or Health)' },
  { value: 'Job Search', name: 'Job Search' },
  { value: 'Legal Services', name: 'Legal Services' },
  { value: 'Lock Boxes', name: 'Lock Boxes' },
  { value: 'Managed Print Services', name: 'Managed Print Services' },
  { value: 'Maps', name: 'Maps' },
  { value: 'Meal Food Packages', name: 'Meal Food Packages' },
  { value: 'Mobile Offices', name: 'Mobile Offices' },
  { value: 'Moving Companies', name: 'Moving Companies' },
  { value: 'Office Resources', name: 'Office Resources' },
  { value: 'Operating Supplies', name: 'Operating Supplies' },
  { value: 'Other', name: 'Other' },
  { value: 'Payroll/Human Resources', name: 'Payroll/Human Resources' },
  {
    value: 'Personality/Sales Assessments',
    name: 'Personality/Sales Assessments'
  },
  { value: 'Portable Containers', name: 'Portable Containers' },
  {
    value: 'Portable Restrooms and Kitchens',
    name: 'Portable Restrooms and Kitchens'
  },
  { value: 'Portable Shelters', name: 'Portable Shelters' },
  {
    value: 'Printing Services (Flyers, Business Cards, Stationary)',
    name: 'Printing Services (Flyers, Business Cards, Stationary)'
  },
  { value: 'Promotional/Marketing Items', name: 'Promotional/Marketing Items' },
  {
    value: 'Recruitment Personnel Services',
    name: 'Recruitment Personnel Services'
  },
  {
    value: 'Restoration Services (Document, Art, and Electronics)',
    name: 'Restoration Services (Document, Art, and Electronics)'
  },
  { value: 'Roofing', name: 'Roofing' },
  { value: 'Safety Products', name: 'Safety Products' },
  { value: 'Sales Leads', name: 'Sales Leads' },
  { value: 'Security Services', name: 'Security Services' },
  { value: 'Signage', name: 'Signage' },
  { value: 'Tarps', name: 'Tarps' },
  { value: 'Temporary Housing', name: 'Temporary Housing' },
  { value: 'Temporary Labor', name: 'Temporary Labor' },
  { value: 'Tents (Promotional)', name: 'Tents (Promotional)' },
  { value: 'Textile Dry Cleaning', name: 'Textile Dry Cleaning' },
  { value: 'Time and Attendance', name: 'Time and Attendance' },
  { value: 'Tires', name: 'Tires' },
  { value: 'Towels', name: 'Towels' },
  { value: 'Trade Show Services', name: 'Trade Show Services' },
  { value: 'Training', name: 'Training' },
  { value: 'Transcription Services', name: 'Transcription Services' },
  { value: 'Truck Rental Services', name: 'Truck Rental Services' },
  {
    value: 'Uniforms and Branded Apparel',
    name: 'Uniforms and Branded Apparel'
  },
  { value: 'Vehicle Maintenance', name: 'Vehicle Maintenance' },
  { value: 'Vehicle Wraps', name: 'Vehicle Wraps' },
  { value: 'Vendor Management', name: 'Vendor Management' },
  { value: 'Voice and Data Services', name: 'Voice and Data Services' },
  {
    value: 'Waste Management Services (Debris Removal and Hazardous Materials)',
    name: 'Waste Management Services (Debris Removal and Hazardous Materials)'
  },
  { value: 'Water Treatment Technology ', name: 'Water Treatment Technology ' },
  { value: 'Wireless Services', name: 'Wireless Services' }
]

const States = [
  { value: 'AL', name: 'Alabama' },
  { value: 'AK', name: 'Alaska' },
  { value: 'AZ', name: 'Arizona' },
  { value: 'AR', name: 'Arkansas' },
  { value: 'CA', name: 'California' },
  { value: 'CO', name: 'Colorado' },
  { value: 'CT', name: 'Connecticut' },
  { value: 'DE', name: 'Delaware' },
  { value: 'DC', name: 'District of Columbia' },
  { value: 'FL', name: 'Florida' },
  { value: 'GA', name: 'Georgia' },
  { value: 'HI', name: 'Hawaii' },
  { value: 'ID', name: 'Idaho' },
  { value: 'IL', name: 'Illinois' },
  { value: 'IN', name: 'Indiana' },
  { value: 'IA', name: 'Iowa' },
  { value: 'KS', name: 'Kansas' },
  { value: 'KY', name: 'Kentucky' },
  { value: 'LA', name: 'Louisiana' },
  { value: 'ME', name: 'Maine' },
  { value: 'MD', name: 'Maryland' },
  { value: 'MA', name: 'Massachusetts' },
  { value: 'MI', name: 'Michigan' },
  { value: 'MN', name: 'Minnesota' },
  { value: 'MS', name: 'Mississippi' },
  { value: 'MO', name: 'Missouri' },
  { value: 'MT', name: 'Montana' },
  { value: 'NE', name: 'Nebraska' },
  { value: 'NV', name: 'Nevada' },
  { value: 'NH', name: 'New Hampshire' },
  { value: 'NJ', name: 'New Jersey' },
  { value: 'NM', name: 'New Mexico' },
  { value: 'NY', name: 'New York' },
  { value: 'NC', name: 'North Carolina' },
  { value: 'ND', name: 'North Dakota' },
  { value: 'OH', name: 'Ohio' },
  { value: 'OK', name: 'Oklahoma' },
  { value: 'OR', name: 'Oregon' },
  { value: 'PA', name: 'Pennsylvania' },
  { value: 'RI', name: 'Rhode Island' },
  { value: 'SC', name: 'South Carolina' },
  { value: 'SD', name: 'South Dakota' },
  { value: 'TN', name: 'Tennessee' },
  { value: 'TX', name: 'Texas' },
  { value: 'UT', name: 'Utah' },
  { value: 'VT', name: 'Vermont' },
  { value: 'VA', name: 'Virginia' },
  { value: 'WA', name: 'Washington' },
  { value: 'WV', name: 'West Virginia' },
  { value: 'WI', name: 'Wisconsin' },
  { value: 'WY', name: 'Wyoming' },
  { value: 'AB', name: 'Alberta' },
  { value: 'BC', name: 'British Columbia' },
  { value: 'MB', name: 'Manitoba' },
  { value: 'NB', name: 'New Brunswick' },
  { value: 'NL', name: 'Newfoundland/Labrador' },
  { value: 'NS', name: 'Nova Scotia' },
  { value: 'ON', name: 'Ontario' },
  { value: 'PE', name: 'Prince Edward Island' },
  { value: 'QC', name: 'Quebec' },
  { value: 'SK', name: 'Saskatchewan' }
]

module.exports = {
  ProductServices,
  States
}
