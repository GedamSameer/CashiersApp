import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Building,
  CreditCard,
  Calculator,
  Palette,
  Bell,
  Shield,
  Save,
  Home,
  ClipboardList,
  ShoppingBag,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCashierStore from "../zustand-stores/cashierStore";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useCashierStore();

  // Settings state
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    // Profile Settings
    profile: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      avatar: "",
    },

    // Restaurant Settings
    restaurant: {
      name: "Rom's Restaurant",
      address: "",
      phone: "",
      email: "",
      taxRate: 5,
      currency: "INR",
    },

    // Payment Settings
    payment: {
      cashEnabled: true,
      cardEnabled: true,
      upiEnabled: true,
      digitalEnabled: true,
    },

    // System Settings
    system: {
      autoPrint: false,
      soundEnabled: true,
      darkMode: false,
      language: "en",
      timezone: "Asia/Kolkata",
    },

    // Notification Settings
    notifications: {
      orderAlerts: true,
      paymentAlerts: true,
      lowStockAlerts: false,
      dailyReports: true,
    },
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async (section) => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert(`${section} settings saved successfully!`);
  };

  const updateSetting = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "restaurant", label: "Restaurant", icon: Building },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "system", label: "System", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      <aside className="w-20 sm:w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center sm:justify-start sm:px-6 py-4 border-b border-gray-200">
            <SettingsIcon size={28} className="sm:hidden text-orange-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500 hidden sm:block">
              Restaurant POS
            </h1>
          </div>

          <nav className="flex flex-col mt-6 space-y-3">
            <button
              onClick={() => navigate("/cashier")}
              className="flex items-center sm:px-6 px-4 py-3 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500 transition w-full text-left"
            >
              <Home size={20} className="text-orange-500" />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Dashboard
              </span>
            </button>

            <button
              onClick={() => navigate("/order")}
              className="flex items-center sm:px-6 px-4 py-3 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500 transition w-full text-left"
            >
              <ShoppingBag size={20} className="text-orange-500" />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Orders
              </span>
            </button>

            <button
              onClick={() => navigate("/reports")}
              className="flex items-center sm:px-6 px-4 py-3 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500 transition w-full text-left"
            >
              <BarChart3 size={20} className="text-orange-500" />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Reports
              </span>
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="flex items-center sm:px-6 px-4 py-3 bg-orange-50 border-l-4 border-orange-500 text-orange-600 font-semibold w-full text-left"
            >
              <SettingsIcon size={20} />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Settings
              </span>
            </button>
          </nav>
        </div>

        <div className="sm:px-6 px-4 py-4 border-t border-gray-200 text-sm text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()} Cashier App
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <SettingsIcon size={36} className="text-orange-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Settings
              </h2>
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                        activeTab === tab.id
                          ? "bg-orange-100 text-orange-700 border border-orange-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <User size={24} className="text-orange-500" />
                    Profile Settings
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) =>
                          updateSetting("profile", "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) =>
                          updateSetting("profile", "email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) =>
                          updateSetting("profile", "phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSave("Profile")}
                      disabled={saving}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </div>
              )}

              {/* Restaurant Settings */}
              {activeTab === "restaurant" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Building size={24} className="text-orange-500" />
                    Restaurant Settings
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Restaurant Name
                      </label>
                      <input
                        type="text"
                        value={settings.restaurant.name}
                        onChange={(e) =>
                          updateSetting("restaurant", "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.restaurant.phone}
                        onChange={(e) =>
                          updateSetting("restaurant", "phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.restaurant.email}
                        onChange={(e) =>
                          updateSetting("restaurant", "email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={settings.restaurant.taxRate}
                        onChange={(e) =>
                          updateSetting("restaurant", "taxRate", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={settings.restaurant.address}
                        onChange={(e) =>
                          updateSetting("restaurant", "address", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSave("Restaurant")}
                      disabled={saving}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save Restaurant Settings"}
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === "payment" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <CreditCard size={24} className="text-orange-500" />
                    Payment Methods
                  </h2>

                  <div className="space-y-4">
                    {[
                      { key: "cashEnabled", label: "Cash Payments" },
                      { key: "cardEnabled", label: "Card Payments" },
                      { key: "upiEnabled", label: "UPI Payments" },
                      { key: "digitalEnabled", label: "Digital Wallets" },
                    ].map((method) => (
                      <div
                        key={method.key}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {method.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Enable/disable this payment method
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.payment[method.key]}
                            onChange={(e) =>
                              updateSetting(
                                "payment",
                                method.key,
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSave("Payment")}
                      disabled={saving}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save Payment Settings"}
                    </button>
                  </div>
                </div>
              )}

              {/* System Settings */}
              {activeTab === "system" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <SettingsIcon size={24} className="text-orange-500" />
                    System Preferences
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Auto Print Receipts
                          </h3>
                          <p className="text-sm text-gray-500">
                            Automatically print receipts after payment
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.system.autoPrint}
                            onChange={(e) =>
                              updateSetting(
                                "system",
                                "autoPrint",
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Sound Effects
                          </h3>
                          <p className="text-sm text-gray-500">
                            Enable/disable system sounds
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.system.soundEnabled}
                            onChange={(e) =>
                              updateSetting(
                                "system",
                                "soundEnabled",
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={settings.system.language}
                          onChange={(e) =>
                            updateSetting("system", "language", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                          <option value="mr">Marathi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={settings.restaurant.currency}
                          onChange={(e) =>
                            updateSetting(
                              "restaurant",
                              "currency",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="INR">Indian Rupee (₹)</option>
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSave("System")}
                      disabled={saving}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save System Settings"}
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Bell size={24} className="text-orange-500" />
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        key: "orderAlerts",
                        label: "New Order Alerts",
                        desc: "Get notified when new orders arrive",
                      },
                      {
                        key: "paymentAlerts",
                        label: "Payment Alerts",
                        desc: "Notifications for payment processing",
                      },
                      {
                        key: "lowStockAlerts",
                        label: "Low Stock Alerts",
                        desc: "Alerts when items are running low",
                      },
                      {
                        key: "dailyReports",
                        label: "Daily Reports",
                        desc: "Receive daily summary reports",
                      },
                    ].map((notification) => (
                      <div
                        key={notification.key}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {notification.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {notification.desc}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications[notification.key]}
                            onChange={(e) =>
                              updateSetting(
                                "notifications",
                                notification.key,
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSave("Notification")}
                      disabled={saving}
                      className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Save size={18} />
                      {saving ? "Saving..." : "Save Notification Settings"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
