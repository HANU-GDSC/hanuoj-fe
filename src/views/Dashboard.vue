<template>
    <div class="dashboard">
        <MainLayout>
            <template v-slot:left>
                <h1>main content go here</h1>
                <p>paste the html between 2 template tag</p>
            </template>
            <template v-slot:right>
                <p>sidebar go here</p>
            </template>
        </MainLayout>
    </div>
</template>

<script>
import MainLayout from "../components/MainLayout";
export default {
    name: "Dashboard",
    components: {
        MainLayout,
    },
};
</script>

<style scoped>
</style>