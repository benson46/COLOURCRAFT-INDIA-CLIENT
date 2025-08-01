import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  LockOpenIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/cropImage";
import { dev_admin_api } from "../../utils/axios";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [],
    mainImageIndex: 0,
  });
  const [formErrors, setFormErrors] = useState({});

  // Image cropping states
  const [croppingImage, setCroppingImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, searchTerm, categoryFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await dev_admin_api.get("/product");
      const apiProducts = response.data.products; // Store raw API response

      // Apply filters to API data directly
      let filteredProducts = apiProducts;
      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (categoryFilter !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === categoryFilter
        );
      }

      // Pagination
      const totalItems = filteredProducts.length;
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      // Update states together
      setAllProducts(filteredProducts);
      setProducts(paginatedProducts);
      setTotalPages(calculatedTotalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setProducts([]);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await dev_admin_api.get("/category");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  // Status text helper
  const getStatusText = (product) => {
    if (product.isBlocked) return "Blocked";
    else if (product.stock === 0) return "Out of Stock";
    else if (product.stock <= 5) return "Low Stock";
    else return "Active";
  };

  // Form validation function
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (parseFloat(formData.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }

    if (!formData.stock) {
      errors.stock = "Stock quantity is required";
    } else if (parseInt(formData.stock) < 0) {
      errors.stock = "Stock cannot be negative";
    }

    if (formData.images.length < 3) {
      errors.images = "At least 3 images are required";
    }

    return errors;
  };

  // Reset form errors
  const resetFormErrors = () => {
    setFormErrors({});
  };

  // Modal handlers
  const openStatusModal = (product) => {
    setSelectedProduct(product);
    setShowStatusModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category._id || product.category,
      price: product.price,
      stock: product.stock,
      images: product.images.map((url) => ({ preview: url, isExisting: true })),
      mainImageIndex: 0,
    });
    resetFormErrors();
    setShowEditModal(true);
  };

  const openAddModal = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      images: [],
      mainImageIndex: 0,
    });
    resetFormErrors();
    setShowAddModal(true);
  };

  // Product actions
  const handleToggleProductStatus = async () => {
    try {
      const response = await dev_admin_api.patch(
        `/product/${selectedProduct._id}`
      );

      if (response.data.success) {
        // Update products state directly
        setAllProducts((prev) =>
          prev.map((p) =>
            p._id === selectedProduct._id
              ? { ...p, isBlocked: response.data.product.isBlocked }
              : p
          )
        );
        
        setProducts((prev) =>
          prev.map((p) =>
            p._id === selectedProduct._id
              ? { ...p, isBlocked: response.data.product.isBlocked }
              : p
          )
        );

        const action = response.data.product.isBlocked
          ? "blocked"
          : "unblocked";
        toast.success(`Product ${action} successfully`);

        setShowStatusModal(false);
        setSelectedProduct(null);
      } else {
        throw new Error(response.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Status toggle error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update product status"
      );
    }
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field changes
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setCroppingImage({ file, url: imageUrl });
  };

  const onCropComplete = (croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropSave = async () => {
    try {
      const croppedFile = await getCroppedImg(
        croppingImage.url,
        croppedAreaPixels
      );
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { file: croppedFile, preview: URL.createObjectURL(croppedFile) },
        ],
      }));
      setCroppingImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast.error("Failed to crop image");
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      
      // Adjust main image index if needed
      let newMainIndex = prev.mainImageIndex;
      if (index === prev.mainImageIndex) {
        newMainIndex = 0;
      } else if (index < prev.mainImageIndex) {
        newMainIndex = prev.mainImageIndex - 1;
      }
      
      return { ...prev, images: newImages, mainImageIndex: newMainIndex };
    });

    // Clear image error if we now have enough images
    if (formErrors.images && formData.images.length - 1 >= 3) {
      setFormErrors((prev) => ({ ...prev, images: undefined }));
    }
  };

  const setMainImage = (index) => {
    setFormData((prev) => ({ ...prev, mainImageIndex: index }));
  };

  const getReorderedImages = () => {
    if (formData.mainImageIndex === 0) return formData.images;
    const newImages = [...formData.images];
    const [mainImage] = newImages.splice(formData.mainImageIndex, 1);
    newImages.unshift(mainImage);
    return newImages;
  };

  // Helper to convert blob to file
  const blobToFile = (blob, fileName) => {
    return new File([blob], fileName, { type: blob.type || 'image/jpeg' });
  };

  // Product CRUD operations
  const handleEditProduct = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fix the form errors");
      return;
    }

    try {
      const imagesToSave = getReorderedImages();

      const formDataToSend = new FormData();

      formDataToSend.append("_id", selectedProduct._id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append(
        "category",
        formData.category
      );
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);

      // Prepare images array
      const existingImages = [];
      const newImages = [];
      
      imagesToSave.forEach(img => {
        if (img.isExisting) {
          existingImages.push(img.preview);
        } else {
          newImages.push(img);
        }
      });
      
      // Append all image URLs (existing + new placeholders)
        formDataToSend.append(
      "images",
      JSON.stringify([
        ...existingImages,
        ...newImages.map(() => "new-image-placeholder")
      ])
    );

      // Append actual new image files
      newImages.forEach((img, index) => {
        const file = img.file instanceof File 
          ? img.file 
          : blobToFile(img.blob, `image-${index}.jpeg`);
        formDataToSend.append("images", file);
      });

      const response = await dev_admin_api.put(
        `/product/${selectedProduct._id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      // Update state with the updated product
      const updatedProduct = response.data.product;
      
      setAllProducts(prevProducts => 
        prevProducts.map(p => 
          p._id === updatedProduct._id ? updatedProduct : p
        )
      );
      
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p._id === updatedProduct._id ? updatedProduct : p
        )
      );

      toast.success("Product updated successfully");
      setShowEditModal(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  const handleAddProduct = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fix the form errors");
      return;
    }

    try {
      const imagesToSave = getReorderedImages();

      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);

      // Convert blob and append to FormData
      imagesToSave.forEach((img, index) => {
        const file = img.file instanceof File
          ? img.file
          : blobToFile(img.blob, `image-${index}.jpeg`);
        formDataToSend.append("images", file);
      });

      const response = await dev_admin_api.post("/product", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Add new product to state
      const newProduct = response.data.product;
      
      setAllProducts(prev => [...prev, newProduct]);
      
      // Recalculate pagination
      const newTotalItems = allProducts.length + 1;
      const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
      
      // Adjust current page if needed
      let newPage = currentPage;
      if (currentPage !== newTotalPages) {
        newPage = newTotalPages;
        setCurrentPage(newTotalPages);
      }
      
      // Update products for current page
      const startIndex = (newPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newProducts = [...allProducts, newProduct].slice(startIndex, endIndex);
      
      setProducts(newProducts);
      setTotalPages(newTotalPages);

      toast.success("Product added successfully");
      setShowAddModal(false);
    } catch (error) {
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        toast.error(error.message || "Failed to add product");
      }
    }
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Products Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-gray-600">
            Manage your product inventory and details
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option key="all" value="all">
              All
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {getStatusText(product)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {typeof product.category === 'object' 
                        ? product.category.title 
                        : categories.find(c => c._id === product.category)?.title}
                    </p>
                  </div>
                  <span className="text-lg font-bold">₹{product.price}</span>
                </div>

                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => openStatusModal(product)}
                    className={`flex items-center text-sm ${
                      product.isBlocked
                        ? "text-green-600 hover:text-green-800"
                        : "text-red-600 hover:text-red-800"
                    }`}
                  >
                    {product.isBlocked ? (
                      <LockOpenIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <LockClosedIcon className="h-4 w-4 mr-1" />
                    )}
                    {product.isBlocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                No products found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-4">
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Toggle status Confirmation Modal */}
      <ConfirmationModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={handleToggleProductStatus}
        title={selectedProduct?.isBlocked ? "Unblock Product" : "Block Product"}
        message={`Are you sure you want to ${
          selectedProduct?.isBlocked ? "unblock" : "block"
        } "${selectedProduct?.title}"?`}
        confirmText={
          selectedProduct?.isBlocked ? "Unblock Product" : "Block Product"
        }
        cancelText="Cancel"
        type={selectedProduct?.isBlocked ? "default" : "danger"}
      />

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Edit Product
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border ${
                      formErrors.title ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={3}
                    className={`w-full px-3 py-2 border ${
                      formErrors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  ></textarea>
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border ${
                      formErrors.category ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.category}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      className={`w-full px-3 py-2 border ${
                        formErrors.price ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {formErrors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleFormChange}
                      className={`w-full px-3 py-2 border ${
                        formErrors.stock ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {formErrors.stock && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.stock}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images (Min 3)
                  </label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img.preview}
                          alt={`image-${idx}`}
                          className={`w-20 h-20 object-cover border-2 ${
                            formData.mainImageIndex === idx
                              ? "border-blue-600"
                              : "border-gray-300"
                          } rounded cursor-pointer`}
                          onClick={() => setMainImage(idx)}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(idx);
                          }}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {formData.images.length < 5 && (
                      <>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="w-20 h-20 border border-dashed rounded flex items-center justify-center text-sm text-gray-500"
                        >
                          + Add
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </>
                    )}
                  </div>
                  {formErrors.images && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.images}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Product
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border ${
                      formErrors.title ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={3}
                    className={`w-full px-3 py-2 border ${
                      formErrors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  ></textarea>
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className={`w-full px-3 py-2 border ${
                      formErrors.category ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.category}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      className={`w-full px-3 py-2 border ${
                        formErrors.price ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {formErrors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleFormChange}
                      className={`w-full px-3 py-2 border ${
                        formErrors.stock ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {formErrors.stock && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.stock}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images (Min 3)
                  </label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img.preview}
                          alt={`image-${idx}`}
                          className={`w-20 h-20 object-cover border-2 ${
                            formData.mainImageIndex === idx
                              ? "border-blue-600"
                              : "border-gray-300"
                          } rounded cursor-pointer`}
                          onClick={() => setMainImage(idx)}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(idx);
                          }}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {formData.images.length < 5 && (
                      <>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="w-20 h-20 border border-dashed rounded flex items-center justify-center text-sm text-gray-500"
                        >
                          + Add
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </>
                    )}
                  </div>
                  {formErrors.images && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.images}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Cropping Modal */}
      {croppingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-4">
            <h3 className="text-lg font-bold mb-2">Crop Image</h3>
            <div className="relative w-full h-64 bg-gray-100">
              <Cropper
                image={croppingImage.url}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setCroppingImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCropSave}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Save Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;