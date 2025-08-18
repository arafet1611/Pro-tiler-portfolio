import React, { useState, useEffect } from "react";
import {
  Eye,
  Filter,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  User,
  FileText,
} from "lucide-react";

const AlertsTable = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      Subject: "tile installation inquiry",
      decription: "Interested in tile installation for a residential project",
      clientName: "Mohamed Ali",
      dateTime: "15/08/2025",
      status: "waiting",
      phone: "50147852",
      location: "Tunis",
      budget: "2000-5000 DT",
      type: "Residential",
    },
    {
      id: 2,
      Subject: "bathroom renovation consultation",
      decription:
        "Need consultation for complete bathroom renovation with modern tiles",
      clientName: "Fatma Ben Ahmed",
      dateTime: "14/08/2025",
      status: "done",
      phone: "98765432",
      location: "Sousse",
      budget: "3000-5000 DT",
      type: "Renovation",
    },
    {
      id: 3,
      Subject: "kitchen flooring project",
      decription:
        "Looking for ceramic tiles for kitchen flooring, approximately 25 square meters",
      clientName: "Ahmed Trabelsi",
      dateTime: "13/08/2025",
      status: "waiting",
      phone: "22334455",
      location: "Sfax",
      budget: "1500-3000 DT",
      type: "Residential",
    },
  ]);

  const [allFormCount, setAllFormCount] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    // Total alerts
    setAllFormCount(alerts.length);

    // Count by status
    setWaitingCount(
      alerts.filter((alert) => alert.status === "waiting").length
    );
    setDoneCount(alerts.filter((alert) => alert.status === "done").length);
    setCancelledCount(
      alerts.filter((alert) => alert.status === "cancelled").length
    );
  }, [alerts]);

  const [configuredAlerts, setConfiguredAlerts] = useState([
    { name: "All Form Submissions", count: allFormCount },
    { name: "Already Done", count: doneCount },
    { name: "Waiting", count: waitingCount },
    { name: "Cancelled", count: cancelledCount },
  ]);

  // Update configuredAlerts whenever counts change
  useEffect(() => {
    setConfiguredAlerts([
      { name: "All Form Submissions", count: allFormCount },
      { name: "Already Done", count: doneCount },
      { name: "Waiting", count: waitingCount },
      { name: "Cancelled", count: cancelledCount },
    ]);
  }, [allFormCount, waitingCount, doneCount, cancelledCount]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "text-green-600 bg-green-50 border-green-200";
      case "waiting":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle className="w-4 h-4" />;
      case "waiting":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewClick = (alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedAlert) {
      setAlerts(
        alerts.map((alert) =>
          alert.id === selectedAlert.id
            ? { ...alert, status: newStatus }
            : alert
        )
      );
      setSelectedAlert({ ...selectedAlert, status: newStatus });
    }
  };
  const totalPages = Math.ceil(alerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlerts = alerts.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Alerts List
            </h1>
            <p className="text-gray-600">
            <span className="hidden sm:inline"> A summary of contact form submissions and project inquiries</span> 
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
  1st Aug 2025 to 16th Aug 2025
            </div>
          
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Alerts Table */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                CONTACT FORM ALERTS
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date/Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {alert.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {alert.dateTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {getStatusIcon(alert.status)}
                          <span className="ml-1.5 capitalize">
                            {alert.status}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {alert.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {alert.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewClick(alert)}
                          className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                {/* Pagination Info */}
                <div className="flex items-center text-sm text-gray-700">
                  <span>
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, alerts.length)} of {alerts.length}{" "}
                    results
                  </span>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="hidden sm:inline">←</span> Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const page = index + 1;
                      const isCurrentPage = page === currentPage;

                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      if (!showPage) {
                        // Show ellipsis
                        if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span key={page} className="px-2 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isCurrentPage
                              ? "bg-red-500 text-white"
                              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
  Next <span className="hidden sm:inline">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Configured Alerts Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                CONFIGURED ALERTS
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {configuredAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-800">
                      {alert.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-red-600">
                    {alert.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Alert Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Client Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Client Name
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {selectedAlert.clientName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone Number
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedAlert.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Location
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedAlert.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Date Submitted
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedAlert.dateTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Budget Range
                        </p>
                        <p className="text-base font-semibold text-gray-900">
                          {selectedAlert.budget}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Project Type
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedAlert.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject and Description */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Subject
                    </p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {selectedAlert.Subject}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Description
                    </p>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {selectedAlert.decription}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Current Status
                  </h4>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      selectedAlert.status
                    )}`}
                  >
                    {getStatusIcon(selectedAlert.status)}
                    <span className="ml-2 capitalize">
                      {selectedAlert.status}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange("waiting")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedAlert.status === "waiting"
                        ? "bg-orange-500 text-white"
                        : "bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100"
                    }`}
                  >
                    <Clock className="w-4 h-4 inline mr-1" />
                    Mark as Waiting
                  </button>
                  <button
                    onClick={() => handleStatusChange("done")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedAlert.status === "done"
                        ? "bg-green-500 text-white"
                        : "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Mark as Done
                  </button>
                  <button
                    onClick={() => handleStatusChange("cancelled")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedAlert.status === "cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                    }`}
                  >
                    <XCircle className="w-4 h-4 inline mr-1" />
                    Mark as Cancelled
                  </button>
                </div>
              </div>
              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsTable;
