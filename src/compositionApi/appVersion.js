function logAppVersion() {
    console.log(
        `%c${process.env.VUE_APP_NAME}%c${process.env.VUE_APP_VERSION}`,
        `padding: 4px 6px; background: #6941e1; border-radius: 5px 0 0 5px; color: white;`,
        `padding: 4px 6px; background: royalblue; border-radius: 0 5px 5px 0; color: white;`
    );
}

export { logAppVersion };
