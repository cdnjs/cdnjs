import Paginate from "../src/components/Paginate.vue";

import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";

describe("Paginate", async () => {
  function initComponent() {
    return mount(Paginate, {
      propsData: {
        pageCount: 10,
      },
    });
  }

  describe("Simple Cases", () => {
    it("success", async () => {
      const wrapper = initComponent();
      expect(wrapper.find("li:first-child a").text()).toBe("Prev");
      expect(wrapper.find("li:last-child a").text()).toBe("Next");
      expect(wrapper.find(".active a").text()).toBe("1");
    });

    it("next and prev button event right", async () => {
      const wrapper = initComponent();
      const nextButton = wrapper.find("li:last-child a");

      await nextButton.trigger("click");
      expect(wrapper.find(".active a").text()).toBe("2");

      const prevButton = wrapper.find("li:first-child a");
      await prevButton.trigger("click");
      expect(wrapper.find(".active a").text()).toBe("1");
    });

    it("prev button when first page", async () => {
      const wrapper = initComponent();
      const prevButton = wrapper.find("li:first-child a");
      await prevButton.trigger("click");
      expect(wrapper.find(".active a").text()).toBe("1");
    });

    it("click page element", async () => {
      const wrapper = initComponent();
      const pageItem = wrapper.find("li:nth-child(3) a");
      await pageItem.trigger("click");
      expect(wrapper.find(".active a").text()).toBe("2");
    });

    it("set initial page success", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          initialPage: 2,
        },
      });
      expect(wrapper.find(".active a").text()).toBe("2");
    });

    it("set forcePage success", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          forcePage: 5,
        },
      });

      const nextButton = wrapper.find("li:last-child a");
      await nextButton.trigger("click");
      expect(wrapper.find(".active a").text()).toBe("5");

      const prevButton = wrapper.find("li:first-child a");
      await prevButton.trigger("click");
      expect(wrapper.find(".active a").text()).toBe("5");
    });

    it("set forcePage in initialPage", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          initialPage: 6,
          forcePage: 6,
        },
      });
      expect(wrapper.find(".active a").text()).toBe("6");
      const nextButton = wrapper.find("li:last-child a");
      await nextButton.trigger("click");
      expect(wrapper.find(".active a").text()).toBe("6");
    });
  });

  describe("page range tests", () => {
    it("page count not more than range", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 5,
          pageRange: 5,
        },
      });
      expect(wrapper.findAll("li a").length).toBe(7);
    });

    it("only has breakView in left", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          initialPage: 10,
          breakViewClass: "break-view",
        },
      });

      expect(wrapper.findAll(`li:nth-child(3).break-view`).length).toBe(1);
      expect(wrapper.find(`li:nth-child(3) a`).text()).toBe("…");
      expect(wrapper.find(`li:nth-child(4) a`).text()).toBe("8");
    });

    it("page range is correct when current page is 1", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          pageRange: 5,
          marginPages: 0,
          initialPage: 1,
          prevClass: "ignore",
          nextClass: "ignore",
          disabledClass: "ignore",
        },
      });
      expect(
        wrapper.findAll("li a").length - wrapper.findAll("li.ignore a").length
      ).toBe(5);
    });

    it("page range is correct when current page is middle page", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          pageRange: 5,
          marginPages: 0,
          initialPage: 5,
          prevClass: "ignore",
          nextClass: "ignore",
          disabledClass: "ignore",
        },
      });
      expect(
        wrapper.findAll("li a").length - wrapper.findAll("li.ignore a").length
      ).toBe(5);
    });

    it("page range is correct when current page is last page", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          pageRange: 5,
          marginPages: 0,
          initialPage: 10,
          prevClass: "ignore",
          nextClass: "ignore",
          disabledClass: "ignore",
        },
      });
      expect(
        wrapper.findAll("li a").length - wrapper.findAll("li.ignore a").length
      ).toBe(5);
    });
  });

  describe("enable first and last button", () => {
    it("Show fist and last button", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          initialPage: 2,
          pageCount: 10,
          firstLastButton: true,
        },
      });

      const firstButton = wrapper.find("li:first-child a");
      const lastButton = wrapper.find("li:last-child a");
      let activeItem = wrapper.find(".active a");
      expect(firstButton.text()).toBe("First");
      expect(lastButton.text()).toBe("Last");
      expect(activeItem.text()).toBe("2");

      await firstButton.trigger("click");
      activeItem = wrapper.find(".active a");
      expect(activeItem.text()).toBe("1");

      await lastButton.trigger("click");
      activeItem = wrapper.find(".active a");
      expect(activeItem.text()).toBe("10");
    });

    it("Show fist and last button when no li surround", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          initialPage: 2,
          pageCount: 10,
          noLiSurround: true,
          firstLastButton: true,
        },
      });

      const firstButton = wrapper.find("a:first-child");
      const lastButton = wrapper.find("a:last-child");
      const activeItem = wrapper.find("a.active");
      expect(firstButton.text()).toBe("First");
      expect(lastButton.text()).toBe("Last");
      expect(activeItem.text()).toBe("2");
    });
  });

  describe("prev and next button hide", () => {
    it("hide prev button when there is no previous page", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          initialPage: 1,
          hidePrevNext: true,
        },
      });
      const firstButton = wrapper.find("li:first-child a");
      expect(firstButton.text()).toBe("1");
    });

    it("hide next button when there is no next page", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 10,
          initialPage: 10,
          hidePrevNext: true,
        },
      });

      const lastButton = wrapper.find("li:last-child a");
      expect(lastButton.text()).toBe("10");
    });

    it("hide next and prev button when only one page", async () => {
      const wrapper = mount(Paginate, {
        propsData: {
          pageCount: 1,
          hidePrevNext: true,
        },
      });

      const firstButton = wrapper.find("li:first-child a");
      const lastButton = wrapper.find("li:last-child a");
      expect(firstButton.text()).toBe("1");
      expect(lastButton.text()).toBe("1");
    });
  });

  it("Use custom text", () => {
    const wrapper = mount(Paginate, {
      propsData: {
        pageCount: 10,
        prevClass: "prev-item",
        nextClass: "next-item",
        breakViewClass: "break-view",
        prevText: "PREVIOUS TEXT",
        nextText: "NEXT TEXT",
        breakViewText: "BREAK VIEW TEXT",
      },
    });

    const prevButton = wrapper.find(".prev-item");
    const nextButton = wrapper.find(".next-item");
    const breakView = wrapper.find(".break-view");
    expect(prevButton.text()).toBe("PREVIOUS TEXT");
    expect(nextButton.text()).toBe("NEXT TEXT");
    expect(breakView.text()).toBe("BREAK VIEW TEXT");
  });
});
