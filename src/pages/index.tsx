import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

import DefaultLayout from "@/layouts/default";
import BooksList from "@/components/books/books-list";
import UserCheckouts from "@/components/checkouts/user-checkouts";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className="text-3xl font-bold py-6 text-center">
          Welcome to library
        </h1>
        <div className="w-full max-w-5xl justify-center flex">
          <Tabs isVertical aria-label="Options" color="primary">
            <Tab key="books" title="Books Available">
              <Card>
                <CardBody>
                  <BooksList />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="checkouts" title="My Checkouts">
              <Card>
                <CardBody>
                  <UserCheckouts />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}
