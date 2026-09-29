import { FileText, Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function MedicalReportCard({
  petName = "Bella",
  owner = "Emily Carter",
  diagnosis = "Routine Health Check",
  reportDate = "06 Aug 2026",
  status = "Completed",
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-slate-100 shadow-sm p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText
              className="text-blue-600"
              size={18}
            />
          </div>

          <h3 className="text-base font-semibold text-slate-800">
            Medical Report
          </h3>
        </div>

        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-700">
            Pet:
          </span>{" "}
          {petName}
        </p>

        <p>
          <span className="font-medium text-slate-700">
            Owner:
          </span>{" "}
          {owner}
        </p>

        <p>
          <span className="font-medium text-slate-700">
            Diagnosis:
          </span>{" "}
          {diagnosis}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>{reportDate}</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <CheckCircle size={14} />
          <span>Verified</span>
        </div>
      </div>
    </motion.div>
  );
}

export default MedicalReportCard;