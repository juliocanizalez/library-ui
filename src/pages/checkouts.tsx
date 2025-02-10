import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

import DefaultLayout from "@/layouts/default";
import ManageUser from "@/components/checkouts/manage-user";
import ManageBooks from "@/components/checkouts/manage-books";
import BookReturn from "@/components/checkouts/book-return";

export default function CheckoutsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold py-6">Librarian Admin</h1>
        <div className="w-full max-w-5xl justify-center flex">
          <Tabs isVertical aria-label="Options" color="primary">
            <Tab key="returns" title="Return a book">
              <Card>
                <CardBody>
                  <BookReturn />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="users" title="Manage Users">
              <Card>
                <CardBody>
                  <ManageUser />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="books" title="Manage Books">
              <Card>
                <CardBody>
                  <ManageBooks />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}
