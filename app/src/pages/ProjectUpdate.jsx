import BeforeAfterGalleryUpdate from '../components/BeforeAfterGalleryUpdate';
import ProjectDetailsUpdate from '../components/ProjectDetailsUpdate';
import TopNavigation from '../components/TopNavigation';
import Sidebar from '../components/Sidebar';
const ProjectUpdate = () => {



    return (
    <div className="min-h-screen bg-gray-50 ">
             <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <TopNavigation />
      </div>

      <div className="flex">
        {/* Sticky sidebar (below the 64px top nav) */}
        <aside className="w-64 shrink-0 sticky top-12 h-[calc(100vh-4rem)]  border-r bg-white">
          <Sidebar />
        </aside>
        {/* Main Content */}
        <div className="flex-1 p-6">
            <ProjectDetailsUpdate />
            <BeforeAfterGalleryUpdate  />
            </div>
            </div> 
        </div>
    );
};

export default ProjectUpdate;