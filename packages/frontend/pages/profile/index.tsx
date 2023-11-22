import Banner from "../../components/ProfilePage/Banner";
import ProfileInfo from "../../components/ProfilePage/ProfileInfo";
import TabsSection from "../../components/ProfilePage/TabsSection";

export default function Component() {


    return (
        <div className="w-full min-h-screen flex flex-col mt-5">
            <Banner />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
                <ProfileInfo />
                <TabsSection />
            </div>
        </div>
    )
}
