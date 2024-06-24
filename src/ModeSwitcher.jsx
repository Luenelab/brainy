const ModeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  
    return (
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        position="fixed"
        top={4}
        right={4}
      />
    );
  };
  
  export default ModeSwitcher;
  