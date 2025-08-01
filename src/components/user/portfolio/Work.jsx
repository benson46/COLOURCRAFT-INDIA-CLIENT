import { useState } from "react"

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All")

  const projects = [
    {
      id: 1,
      title: "Oranges at dusk",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Creative branding project with vibrant color palette",
    },
    {
      id: 2,
      title: "Digital works",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Modern digital design solutions",
    },
    {
      id: 3,
      title: "Pexels Bag",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Sustainable packaging design",
    },
    {
      id: 4,
      title: "Wall Digital works",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Large format digital installations",
    },
    {
      id: 5,
      title: "Magazine's Print",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Editorial design and layout",
    },
    {
      id: 6,
      title: "Minimal Wall Print",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Minimalist poster design",
    },
    {
      id: 7,
      title: "Book Mockup works",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Book cover and layout design",
    },
    {
      id: 8,
      title: "Business Card",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Professional business card design",
    },
    {
      id: 9,
      title: "Street Billboard",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Large scale outdoor advertising",
    },
    {
      id: 10,
      title: "Skin care Product",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Premium skincare packaging",
    },
    {
      id: 11,
      title: "Skin care product",
      category: "Branding",
      image: "/placeholder.svg?height=400&width=400",
      description: "Luxury cosmetic packaging design",
    },
  ]

  const categories = ["All", "Branding", "Print", "Packaging", "Advertising", "Web Design"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="work" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={project.image || "/placeholder.svg?height=400&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 font-medium">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-coral-500 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
