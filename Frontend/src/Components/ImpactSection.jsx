import { FaLeaf, FaHeart, FaMapMarkerAlt, FaUsers, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ImpactSection() {
  return (
    <div className="bg-white">
      <div className="bg-orange-50/50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div>
               <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                 Fighting Food Waste <br /> & <span className="text-green-600">Hunger</span>
               </h2>
               <p className="text-lg text-gray-600 leading-relaxed">
                 Every year, millions of tons of perfectly good food go to waste
                 while people in our communities struggle with food insecurity.
                 <span className="font-bold text-gray-800"> PlateForward </span>
                 bridges this gap by creating a platform where excess food finds
                 its way to those who need it most.
               </p>
            </div>

            <ul className="space-y-6">
              <ImpactPoint 
                 icon={FaLeaf} 
                 color="green" 
                 title="Environmental Impact" 
                 desc="Reducing methane emissions by diverting food from landfills."
              />
              <ImpactPoint 
                 icon={FaHeart} 
                 color="red" 
                 title="Community Support" 
                 desc="Providing nutritious meals to shelters and families in need."
              />
              <ImpactPoint 
                 icon={FaUsers} 
                 color="blue" 
                 title="Social Connection" 
                 desc="Strengthening neighborhood bonds through shared resources."
              />
            </ul>
          </div>

          {/* Right Side: Stats/Visuals */}
          <div className="grid grid-cols-2 gap-4">
              <StatCard value="1200+" label="Meals Saved" color="bg-green-100 text-green-700" />
              <StatCard value="450+" label="Active Donors" color="bg-orange-100 text-orange-700" />
              <StatCard value="85+" label="NGO Partners" color="bg-blue-100 text-blue-700" />
              <StatCard value="5000kg" label="CO2 Prevented" color="bg-teal-100 text-teal-700" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white/90 font-sans py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of community members who are taking action today. 
            Whether you have food to give or time to share, your contribution matters.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Link to="/add-donation">
              <CTAButton text="Join as Donor" primary />
            </Link>
            <Link to="/register">
               <CTAButton text="Volunteer Now" />
            </Link>
            <Link to="/ngo-dashboard">
               <CTAButton text="Find Food" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const ImpactPoint = ({ icon: Icon, color, title, desc }) => {
   const colors = {
      green: "text-green-500 bg-green-50",
      red: "text-red-500 bg-red-50",
      blue: "text-blue-500 bg-blue-50",
   };

   return (
    <li className="flex items-start gap-4">
      <div className={`p-3 rounded-xl ${colors[color]} shrink-0 mt-1`}>
         <Icon className="text-xl" />
      </div>
      <div>
         <h4 className="font-bold text-gray-900">{title}</h4>
         <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </li>
   )
}

const StatCard = ({ value, label, color }) => (
   <div className={`p-8 rounded-2xl flex flex-col items-center justify-center text-center ${color}`}>
      <span className="text-3xl font-extrabold mb-1">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{label}</span>
   </div>
)

const CTAButton = ({ text, primary }) => (
  <button className={`
      px-8 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 flex items-center gap-2 justify-center w-full sm:w-auto
      ${primary 
        ? 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/50' 
        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm'
      }
  `}>
    <span>{text}</span>
    {primary && <FaArrowRight className="text-sm" />}
  </button>
)
