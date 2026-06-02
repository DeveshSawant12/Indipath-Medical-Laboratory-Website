import { Info, Keyboard, MousePointer } from "lucide-react";

/**
 * AdminAccessInfo Component
 *
 * This component displays information about how to access the hidden admin portal.
 * The admin portal is intentionally hidden from regular patients for security.
 *
 * Access Methods:
 * 1. Keyboard Shortcut: Ctrl + Shift + A (implemented in Home.tsx)
 * 2. Triple-click: On the IndipATH logo in the footer (implemented in Footer.tsx)
 * 3. Direct URL: Navigate to /admin directly
 *
 * Demo Credentials:
 * - Email: admin@indipath.com
 * - Password: admin123
 *
 * Note: For production, replace localStorage auth with Supabase authentication
 */

export default function AdminAccessInfo() {
  return (
    <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-start gap-3 mb-4">
        <Info className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Admin Access Methods
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            For security, the admin portal is hidden from
            regular users. You can access it using:
          </p>
        </div>
      </div>

      <div className="space-y-3 ml-8">
        <div className="flex items-start gap-3">
          <Keyboard className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Keyboard Shortcut
            </p>
            <p className="text-xs text-gray-600">
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">
                Ctrl + Shift + A
              </kbd>{" "}
              anywhere on the homepage
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MousePointer className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Hidden Click Area
            </p>
            <p className="text-xs text-gray-600">
              Triple-click on the Indipath logo in the footer
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Direct URL
            </p>
            <p className="text-xs text-gray-600">
              Navigate to{" "}
              <code className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">
                /admin
              </code>{" "}
              directly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}